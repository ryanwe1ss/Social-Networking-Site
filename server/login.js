const { database } = require("./db_connect");

function Login(request, result) {
  const credentials = request.body;
  database.query(`SELECT id, username, password FROM accounts
    WHERE username='${credentials.username}' AND password='${credentials.password}'`,

    function (error, data) {
      if (!error) {
        if (data.rows.length > 0) {
          result.send({
            'id': data.rows[0].id,
            'username': data.rows[0].username,
          })
        } else {
          result.send("invalid");
        }
      }
    }
  );
}
module.exports = { Login }