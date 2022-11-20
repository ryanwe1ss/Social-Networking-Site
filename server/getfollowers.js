const { database } = require("./db_connect");

function GetFollowers(request, result)
{
  database.query(`
    SELECT accounts.id, username, name from accounts
    LEFT JOIN communications ON communications.follower = accounts.id
    WHERE communications.user = ${request.query.id} AND enabled=TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { GetFollowers }