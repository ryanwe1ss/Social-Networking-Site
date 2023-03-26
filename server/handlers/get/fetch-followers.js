const { database } = require("../../database/db_connect");

function FetchFollowers(request, result)
{
  database.query(`
    SELECT accounts.id, username, name from accounts
    LEFT JOIN connections ON connections.follower = accounts.id
    WHERE connections.user = ${request.session.user.id} AND is_enabled=TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { FetchFollowers }