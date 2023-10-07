const { database } = require("../../../database/database");

function FetchBlocked(request, result)
{
  database.query(`
    SELECT accounts.id, username, name from accounts
    LEFT JOIN "blocked" ON "blocked".user = accounts.id
    WHERE blocker = ${request.session.user.id} AND is_enabled=TRUE`, function(error, data) {
      if (!error) result.send(data.rows);
    }
  );
}
module.exports = { FetchBlocked }