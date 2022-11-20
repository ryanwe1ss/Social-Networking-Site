const { database } = require("./db_connect");

function GetFollowing(request, result)
{
  database.query(`
    SELECT accounts.id, username, name FROM accounts
    LEFT JOIN connections ON connections.user = accounts.id
    WHERE connections.follower = ${request.query.id} AND enabled=TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { GetFollowing }