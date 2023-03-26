const { database } = require("../../database/db_connect");

function SearchAccounts(request, result)
{
  database.query(`
    SELECT
      id,
      username
    FROM
      accounts
    WHERE username ILIKE '%${request.query.searchQuery}%'
    AND id != ${request.session.user.id} AND is_enabled = TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
  });
}
module.exports = { SearchAccounts }