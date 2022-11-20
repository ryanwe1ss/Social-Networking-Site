const { database } = require("./db_connect");

function Login(request, result) {
  const credentials = request.body;

  database.query(`
    SELECT id, username, password FROM accounts
    WHERE username='${credentials.username}' AND password='${credentials.password}'
    AND enabled = TRUE`,

    function (error, data) {
      if (!error) {
        if (data.rows.length > 0) {
          database.query(`
            INSERT INTO active_sessions (id, session_id)
            VALUES ('${data.rows[0].id}', '${credentials.session_id}')`,
            function(error, data) {
              if (error) {
                result.send("error creating session");
                return;
              }
          });
          result.send({
            'id': data.rows[0].id,
            'username': data.rows[0].username,
          })
          console.log(`${credentials.username} has logged in`)

        } else {
          result.send("invalid");
        }
      }
    }
  );
}
module.exports = { Login }