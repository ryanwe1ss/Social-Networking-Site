const { database } = require("../../database/db_connect");

function FetchFollowing(request, result)
{
  database.query(`
    SELECT
      accounts.id,
      username,
      name
    FROM
      accounts
    LEFT JOIN connections ON connections.account = accounts.id
    WHERE
      connections.follower = ${request.query.id}
      AND NOT (SELECT EXISTS(SELECT * FROM "blocked" WHERE "user" = ${request.session.user.id} AND blocker = accounts.id))
      AND is_enabled=TRUE`,
      
    function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { FetchFollowing }