const { database } = require("../../database/db_connect");

function Register(request, result)
{
  const credentials = request.body;
  if (credentials.password !== credentials.confirm) {
    result.send("mismatch");
    return;
  
  } else if (credentials.username.length < 5 || credentials.username.length > 12) {
    result.send("username-length");
    return;
  
  } else if (credentials.password.length < 5 || credentials.password.length > 12) {
    result.send("password-length");
    return;
  }

  database.query(`SELECT * FROM accounts WHERE username = '${credentials.username}'`, function(error, data) {
    if (error) {
      result.send("error");
      return;
    }

    if (data.rows.length > 0) {
      result.send("exists");
      return;
    }

    database.query(`
      INSERT INTO accounts (username, password)
      VALUES ('${credentials.username}', '${credentials.password}')`,
      
      (error, rows) => {
        if (error) {
          result.send(error);
          return;
        
        } result.send("success");
      });
  });
}
module.exports = { Register }