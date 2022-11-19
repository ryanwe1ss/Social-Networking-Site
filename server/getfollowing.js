const { database } = require("./db_connect");

function GetFollowing(request, result)
{
  database.query(`
    SELECT username FROM accounts
    LEFT JOIN communications ON communications.user = accounts.id
    WHERE communications.follower = ${request.query.id}`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { GetFollowing }