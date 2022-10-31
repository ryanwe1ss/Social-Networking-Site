const { database } = require("./db_connect");

function SearchAccounts(request, result)
{
  database.query(`
    SELECT id, name FROM accounts
    WHERE name LIKE '%${request.query.searchQuery}%'
    AND id != ${request.query.id} LIMIT 10`, function(error, data) {
      if (!error) result.send(data.rows);
  });
}
module.exports = { SearchAccounts }