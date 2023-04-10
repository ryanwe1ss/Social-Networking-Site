const { database } = require("../../database/db_connect");

function FetchProfile(request, result)
{
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
      date_created,
      date_updated,

      (SELECT EXISTS(SELECT * FROM "blocked" WHERE blocker = ${request.session.user.id} AND "user" = ${request.query.profileId}) AS is_blocking),
      (SELECT EXISTS(SELECT * FROM "blocked" WHERE blocker = ${request.query.profileId} AND "user" = ${request.session.user.id}) AS is_blocked),
    
      (SELECT COUNT(*) FROM accounts
        LEFT JOIN connections ON connections.follower = accounts.id
        WHERE connections.account = ${request.query.profileId} AND is_enabled=TRUE) AS followers,

      (SELECT COUNT(*) FROM accounts
        LEFT JOIN connections ON connections.account = accounts.id 
        WHERE connections.follower = ${request.query.profileId} AND is_enabled=TRUE) AS following,

      (SELECT EXISTS(SELECT * FROM connections
        WHERE follower = ${request.session.user.id}
        AND account = ${request.query.profileId})
        AS is_following),

      (SELECT EXISTS(SELECT * FROM follow_requests
        WHERE follower_id = ${request.session.user.id} AND account_id = ${request.query.profileId} AND
        accepted = FALSE AND declined = FALSE) AS is_requested)

    FROM accounts
    WHERE accounts.id=${request.query.profileId} AND is_enabled=TRUE`,
    
    function(error, data) {
      if (!error) result.send(data.rows[0]);
    });
}
module.exports = { FetchProfile }