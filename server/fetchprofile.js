const { database } = require("./db_connect");

function FetchProfile(request, result)
{
  database.query(`
    SELECT accounts.id, username, name, date_created, date_updated, gender, status, birthdate, school, concentration, email, phone_number, bio,
    (SELECT COUNT(*) FROM accounts
      LEFT JOIN communications ON communications.follower = accounts.id
      WHERE communications.user = ${request.query.profileId} AND enabled=true) as followers,

    (SELECT COUNT(*) FROM accounts
      LEFT JOIN communications ON communications.user = accounts.id 
      WHERE communications.follower = ${request.query.profileId} AND enabled=true) as following,

    (SELECT EXISTS(SELECT * FROM communications
      WHERE follower = ${request.query.id}
      AND "user" = ${request.query.profileId})
      AS is_following)

    FROM accounts
    WHERE accounts.id=${request.query.profileId} AND enabled=TRUE`, function(error, data) {
    if (!error) result.send(data.rows);
  });
}
module.exports = { FetchProfile }