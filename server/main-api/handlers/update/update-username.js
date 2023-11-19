const { database } = require("../../../database/database");

function UpdateUsername(request, result)
{
  const username = request.query.username;
  if (username.length < 5 || username.length > 20) {
    return result.sendStatus(400);
  }

  database.query(`
    SELECT
      id
    FROM
      accounts
    WHERE
      username = '${username}'`,
      
    function (error, data) {
      if (error) return result.sendStatus(500);
      if (data.rows.length > 0) return result.sendStatus(409);

      database.query(`
        UPDATE
          accounts
        SET
          username = '${username}'
        WHERE
          id = ${request.session.user.id}`,

        function (error, data) {
          result.sendStatus(error ? 500 : 200);
        }
      );
    }
  );
}
module.exports = { UpdateUsername }