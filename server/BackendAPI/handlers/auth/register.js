const { database } = require("../../database/db_connect");

const FileServer_URL = process.env.REACT_APP_FILE_SERVER;
const FileServer_Port = process.env.REACT_APP_FS_USE_PORT_IN_URL == "true" ? `:${process.env.REACT_APP_FILE_SERVER_PORT}` : '';

function Register(request, result)
{
  const credentials = request.body;
  if (credentials.password !== credentials.confirm) {
    return result.sendStatus(401);
  
  } else if (credentials.username.length < 5 || credentials.username.length > 20 || credentials.password.length < 5 || credentials.password.length > 20) {
    return result.sendStatus(400);
  }

  database.query(`SELECT username FROM accounts WHERE username = '${credentials.username}'`, function(error, data) {
    if (error) return result.sendStatus(500);
    if (data.rows.length > 0) return result.sendStatus(409);

    database.query(`
      SELECT date_created FROM accounts
      WHERE date_created > current_timestamp - interval '1 minutes'`,

      function(error, results) {
        if (error) return result.sendStatus(500);
        if (results.rows.length > 0) return result.sendStatus(429);

        database.query(`
          INSERT INTO accounts (username, password)
          VALUES ('${credentials.username}', '${credentials.password}')`,
          
          (error, _) => {
            if (error) return result.sendStatus(500);
            {
              database.query(`SELECT id FROM accounts WHERE username = '${credentials.username}'`, function(error, results) {
                const accountId = results.rows[0].id;

                fetch(`${FileServer_URL}${FileServer_Port}/fs-api/register`, {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({id: accountId})
                })
                .then(response => {
                  if (response.status == 200) {
                    database.query(`INSERT INTO statistics (account_id) VALUES (${accountId})`, (error, data) => {
                      if (error) console.log(`Error creating statistic record for new account: ${accountId}`);
                    
                    }); return result.sendStatus(200);
                  
                  } throw new Error(response.status);
                })
                .catch((errorCode) => {
                  database.query(`DELETE FROM accounts WHERE username = '${credentials.username}'`, function(error, _) {});
                  result.sendStatus(parseInt(errorCode.message) || 502);
                })
              });
            }
          }
        );
      }
    );
  });
}
module.exports = { Register }