const { database } = require("./db_connect");

function Login(request, result)
{
  const attempt = request.body;
  database.query(`SELECT id, username, password FROM accounts
    WHERE username='${attempt.username}' AND password='${attempt.password}'`,

    function(error, data) {
      if (!error) {
        if (data.rows.length > 0) {
          result.send(data.rows[0].id.toString());
        } else {
          result.send("invalid");
        }
      }
    }
  );
}
module.exports = { Login }