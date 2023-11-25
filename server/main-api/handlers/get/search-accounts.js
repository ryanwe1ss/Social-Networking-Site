const { database } = require("../../../database/database");

function SearchAccounts(request, result)
{
  database.query(`
    SELECT
      id,
      name,
      username,
      CASE
        WHEN (
          SELECT COUNT(*)
          FROM connections
          WHERE account = accounts.id AND follower = ${request.session.user.id}
        ) > 0 THEN TRUE ELSE FALSE
      END AS is_following,
      (SELECT
        public_messaging
        WHERE id = accounts.id
      ) AS has_public_messaging
    FROM
      accounts
    WHERE
      username ILIKE '%${request.query.searchQuery}%'
      ${request.query.all ? "" : "AND id != " + request.session.user.id}
      AND is_enabled = TRUE
      AND NOT (SELECT EXISTS(
        SELECT * FROM blocked
        WHERE "user" = ${request.session.user.id}
        AND blocker = accounts.id))
    ORDER BY id ASC`,
    
    function(error, data) {
      if (!error) result.send(data.rows);
      else result.sendStatus(500);
    }
  );
}
module.exports = { SearchAccounts }