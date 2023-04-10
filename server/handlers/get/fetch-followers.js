const { database } = require("../../database/db_connect");

function FetchFollowers(request, result)
{
  database.query(`
    SELECT accounts.id, username, name FROM accounts
    LEFT JOIN connections ON connections.follower = accounts.id
    WHERE connections.account = ${request.query.id} AND is_enabled=TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { FetchFollowers }