const { database } = require("../../database/db_connect");

function SearchAccounts(request, result)
{
  database.query(`
    SELECT id, username
    FROM accounts
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
    }
  );
}
module.exports = { SearchAccounts }