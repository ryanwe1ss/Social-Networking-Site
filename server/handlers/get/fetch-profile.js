const { database } = require("../../database/db_connect");

function FetchProfile(request, result)
{
  database.query(`
    SELECT * FROM accounts WHERE username='${request.query.username}' AND is_enabled=TRUE`,

    function(error, results) {
      if (!error && results.rows.length > 0) {
        const profileId = results.rows[0].id;

        database.query(`
          SELECT
            accounts.id,
            username,
            password,
            name,
            gender,
            status,
            birthdate,
            school,
            major,
            email,
            phone_number,
            bio,
            is_enabled,
            is_private,
            public_messaging,
            date_created,
            date_updated,

            (SELECT EXISTS(SELECT * FROM "blocked" WHERE blocker = ${request.session.user.id} AND "user" = ${profileId}) AS is_blocking),
            (SELECT EXISTS(SELECT * FROM "blocked" WHERE blocker = ${profileId} AND "user" = ${request.session.user.id}) AS is_blocked),

            (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', id, 'file_name', file_name)) AS posts FROM posts WHERE creator_id = ${profileId}) AS posts,
          
            (SELECT COUNT(*) FROM accounts
              LEFT JOIN connections ON connections.follower = accounts.id
              WHERE
                connections.account = ${profileId}
                AND NOT (SELECT EXISTS(SELECT * FROM "blocked" WHERE "user" = ${request.session.user.id} AND blocker = accounts.id))
                AND is_enabled=TRUE
            ) AS followers,

            (SELECT COUNT(*) FROM accounts
              LEFT JOIN connections ON connections.account = accounts.id 
              WHERE
                connections.follower = ${profileId}
                AND NOT (SELECT EXISTS(SELECT * FROM "blocked" WHERE "user" = ${request.session.user.id} AND blocker = accounts.id))
                AND is_enabled=TRUE
            ) AS following,

            (SELECT EXISTS(SELECT * FROM connections
              WHERE follower = ${request.session.user.id}
              AND account = ${profileId})
              AS is_following),

            (SELECT EXISTS(SELECT * FROM follow_requests
              WHERE follower_id = ${request.session.user.id} AND account_id = ${profileId} AND
              accepted = FALSE AND declined = FALSE) AS is_requested)

          FROM
            accounts
          WHERE
            accounts.id=${profileId} AND
            is_enabled=TRUE`,
          
          function(error, data) {
            if (!error && data.rows.length > 0) {
              result.send(data.rows[0]);
            } else {
              result.send([]);
            }
          }
        );

      } else return result.send([]);
    }
  );
}
module.exports = { FetchProfile }