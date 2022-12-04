const { database } = require("../../database/db_connect");

function GetFollowers(request, result)
{
  database.query(`
    SELECT accounts.id, username, name from accounts
    LEFT JOIN connections ON connections.follower = accounts.id
    WHERE connections.user = ${request.query.id} AND enabled=TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { GetFollowers }