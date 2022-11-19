const { database } = require("./db_connect");

function GetFollowers(request, result)
{
  database.query(`
    SELECT username from accounts
    LEFT JOIN communications ON communications.follower = accounts.id
    WHERE communications.user = ${request.query.id}`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { GetFollowers }