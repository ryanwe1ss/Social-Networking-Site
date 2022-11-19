const { database } = require("./db_connect");

function GetFollowing(request, result)
{
  database.query(`
    SELECT accounts.id, username, name FROM accounts
    LEFT JOIN communications ON communications.user = accounts.id
    WHERE communications.follower = ${request.query.id}`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { GetFollowing }