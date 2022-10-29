const { database } = require("./db_connect");

function GetProfile(request, result)
{
  database.query(`
    SELECT id, name, date_created, date_updated,
    gender, status, birthdate, school, concentration,
    email, phone_number, bio FROM accounts
    WHERE id=${request.query.id}`, function(error, data) {
    if (!error) result.send(data.rows);
  });
}
module.exports = { GetProfile }