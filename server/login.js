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
          request.session.user = { username: credentials.username };
          request.session.save();
          result.send({ 'id': data.rows[0].id });

        } else result.send("invalid");
      }
    }
  );
}
module.exports = { Login }