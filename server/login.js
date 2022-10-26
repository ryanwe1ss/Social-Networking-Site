const { database } = require("./db_connect");

function Login(request, result)
{
  const username = request.body.username;
  const password = request.body.password;

  database.query(`SELECT id, username, password FROM accounts
    WHERE username='${username}' AND password='${password}'`,

    function(error, rows) {
      if (!error) {
        if (rows.length > 0) {
          result.send(rows[0].id.toString());
        } else {
          result.send("invalid");
        }
      }
    }
  );
}
module.exports = { Login }