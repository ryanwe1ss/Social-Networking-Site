const { database } = require("../../../database/database");

function UpdateUsername(request, result)
{
  const username = request.query.username;
  if (username.length < 5 || username.length > 20) {
    result.sendStatus(400);
    return;
  }

  database.query(`SELECT * FROM accounts WHERE username = '${username}'`, function (error, data) {
    if (error) {
      result.sendStatus(500);
      return;
    }

    if (data.rows.length > 0) {
      result.sendStatus(409);
      return;
    }

    database.query(`
      UPDATE accounts
      SET username = '${username}'
      WHERE id = ${request.session.user.id}`,

      function (error, data) {
        if (error) {
          result.sendStatus(500);
          return;
        }
        result.sendStatus(200);
      }
    );
  });
}
module.exports = { UpdateUsername }