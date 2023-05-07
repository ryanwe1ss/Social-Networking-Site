const { database } = require("../../database/db_connect");
const fs = require("fs");

function Register(request, result)
{
  const credentials = request.body;
  if (credentials.password !== credentials.confirm) {
    result.sendStatus(401);
    return;
  
  } else if (credentials.username.length < 5 || credentials.username.length > 20 || credentials.password.length < 5 || credentials.password.length > 20) {
    result.sendStatus(400);
    return;
  }

  database.query(`SELECT * FROM accounts WHERE username = '${credentials.username}'`, function(error, data) {
    if (error) {
      result.sendStatus(500);
      return;
    }

    if (data.rows.length > 0) {
      result.sendStatus(409);
      return;
    }

    database.query(`
    SELECT date_created FROM accounts
    WHERE date_created > current_timestamp - interval '5 minutes'`,
    
    function(error, results) {
      if (error) {
        result.sendStatus(500);
        return;
      }

      if (results.rows.length > 0) {
        result.sendStatus(429);
        return;
      }

      database.query(`
        INSERT INTO accounts (username, password)
        VALUES ('${credentials.username}', '${credentials.password}')`,
        
        (error, data) => {
          if (error) {
            result.sendStatus(500);
            return;
          } {
            result.sendStatus(200);
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
        }
      );
    });
  })
}
module.exports = { Register }