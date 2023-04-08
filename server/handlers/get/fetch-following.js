const { database } = require("../../database/db_connect");

function FetchFollowing(request, result)
{
  database.query(`
    SELECT accounts.id, username, name FROM accounts
    LEFT JOIN connections ON connections.user = accounts.id
    WHERE connections.follower = ${request.query.id} AND is_enabled=TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { FetchFollowing }