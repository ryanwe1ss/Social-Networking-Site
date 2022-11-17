const { database } = require("./db_connect");

function FetchProfile(request, result)
{
  database.query(`
    SELECT accounts.id, username, name, date_created, date_updated,
    gender, status, birthdate, school, concentration,
    email, phone_number, bio, followers, following FROM accounts
    LEFT JOIN communications on communications.id = accounts.id
    WHERE accounts.id=${request.query.id} AND enabled=TRUE`, function(error, data) {
    if (!error) result.send(data.rows);
  });
}
module.exports = { FetchProfile }