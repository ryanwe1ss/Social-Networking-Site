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
        WHERE connections.user = ${request.query.profileId} AND is_enabled=true) as followers,

      (SELECT COUNT(*) FROM accounts
        LEFT JOIN connections ON connections.user = accounts.id 
        WHERE connections.follower = ${request.query.profileId} AND is_enabled=true) as following,

      (SELECT EXISTS(SELECT * FROM connections
        WHERE follower = ${request.session.user.id}
        AND "user" = ${request.query.profileId})
        AS is_following)

    FROM accounts
    WHERE accounts.id=${request.query.profileId} AND is_enabled=TRUE`,
    
    function(error, data) {
      if (!error) result.send(data.rows[0]);
    });
}
module.exports = { FetchProfile }