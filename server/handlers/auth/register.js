const { database } = require("../../database/db_connect");
const fs = require("fs");

function Register(request, result)
{
  const credentials = request.body;
  if (credentials.password !== credentials.confirm) {
    result.send("mismatch");
    return;
  
  } else if (credentials.username.length < 5 || credentials.username.length > 20) {
    result.send("username-length");
    return;
  
  } else if (credentials.password.length < 5 || credentials.password.length > 20) {
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
      
      (error, data) => {
        if (error) {
          result.send(error);
          return;
        } {
          result.send("success");
          database.query(`SELECT id FROM accounts WHERE username = '${credentials.username}'`, function(error, data) {
            const accountId = data.rows[0].id;

            fs.mkdir(`./data/posts/${accountId}`, { recursive: true }, (error) => {
              if (error) {
                console.log("Error Creating folder in /data/posts/ for new account: " + error);
                return;
              }

              database.query(`INSERT INTO statistics (account_id) VALUES (${accountId})`, (error, data) => {
                if (error) console.log(`Error creating statistic record for new account: ${accountId}`);
              });
            });
          });
        }
      });
  });
}
module.exports = { Register }