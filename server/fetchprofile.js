const { database } = require("./db_connect");

function FetchProfile(request, result)
{
  database.query(`
    SELECT accounts.id, username, name, date_created, date_updated, gender, status, birthdate, school, concentration, email, phone_number, bio,
    (SELECT COUNT(*) FROM communications WHERE accounts.id = communications.user) as followers,
    (SELECT COUNT(*) FROM communications WHERE accounts.id = communications.follower) as following,
    (SELECT EXISTS(SELECT * FROM communications
      WHERE follower = ${request.query.id}
      and "user" = ${request.query.profileId})
      as is_following)

    FROM accounts
    WHERE accounts.id=${request.query.profileId} AND enabled=TRUE`, function(error, data) {
    if (!error) result.send(data.rows);
  });
}
module.exports = { FetchProfile }