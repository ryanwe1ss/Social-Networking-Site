const { database } = require("../../../database/database");

function FetchFollowers(request, result)
{
  database.query(`
    SELECT
      accounts.id,
      username,
      name
    FROM
      accounts
    LEFT JOIN
      connections ON connections.follower = accounts.id
    WHERE
      connections.account = ${request.query.profileId}
      AND NOT (SELECT EXISTS(SELECT * FROM BLOCKED WHERE "user" = ${request.session.user.id} AND blocker = accounts.id))
      AND is_enabled=TRUE`,
      
    function(error, data) {
      if (!error) result.send(data.rows);
      else result.sendStatus(500);
    }
  );
}
module.exports = { FetchFollowers }