const { database } = require("../../database/db_connect");

function Login(request, result) {
  const credentials = request.body;

  database.query(`
    SELECT
      id,
      username,
      password
    FROM
      admin_accounts
    WHERE
      username='${credentials.username}' AND
      password='${credentials.password}'`,
      
    (error, data) => {
      if (!error) {
        if (data.rows.length > 0) {
          const accountId = data.rows[0].id;

          request.session.user = {
            id: accountId,
            username: credentials.username,
            type: 'admin',
        };
        request.session.save();

        result.send({
          'id': accountId,
          'username': data.rows[0].username,
          'type': 'admin',
          'status': 200,
        });
      
      } else {
        database.query(`
          SELECT
            id,
            username,
            password
          FROM
            accounts
          WHERE
            username='${credentials.username}' AND
            password='${credentials.password}' AND
            is_enabled = TRUE`,

          function (error, data) {
            if (!error) {
              if (data.rows.length > 0) {
                const accountId = data.rows[0].id;

                request.session.user = {
                  id: accountId,
                  username: credentials.username,
                  type: 'user',
                };
                request.session.save();
                
                result.send({
                  'id': accountId,
                  'username': credentials.username,
                  'token': request.headers.cookie,
                  'type': 'user',
                  'status': 200,
                });

                database.query(`UPDATE statistics SET total_logins = total_logins + 1, last_login = NOW() WHERE account_id = ${accountId}`, (error, data) => {
                  if (error) console.log(`Error updating last login for account: ${accountId}`);
                });

              } else result.send({ 'status': 401 });
            }
            else result.send({ 'status': 401 });
          }
        );
      }
    }
  });
}
module.exports = { Login }