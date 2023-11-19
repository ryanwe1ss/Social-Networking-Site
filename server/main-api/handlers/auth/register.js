const { database } = require("../../../database/database");
const crypto = require('crypto');

const FileServer_URL = process.env.FILE_SERVER;
const FileServer_Port = process.env.FS_API_USE_PORT_IN_URL == "true" ? `:${process.env.FILE_SERVER_PORT}` : '';

function Register(request, result)
{
  const credentials = request.body;
  const hash = crypto.createHash('sha256');

  if (credentials.password !== credentials.confirm) {
    return result.sendStatus(401);
  
  } else if (credentials.username.length < 5 || credentials.username.length > 20 || credentials.password.length < 5 || credentials.password.length > 20) {
    return result.sendStatus(400);
  }

  hash.update(credentials.password);
  credentials.password = hash.digest('hex');

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
                .then(() => result.sendStatus(200));
              });
            }
          }
        );
      }
    );
  });
}
module.exports = { Register }