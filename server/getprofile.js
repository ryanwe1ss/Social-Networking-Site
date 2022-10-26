const { database } = require("./db_connect");

function GetProfile(request, result)
{
  database.query(`
    SELECT id, username, date_created, last_updated,
    gender, status, birthday, school, concentration,
    email, phone_number, bio FROM accounts
    WHERE id=${request.query.id}`, function(error, data) {
    if (!error) result.send(data);
  });
}
module.exports = { GetProfile }