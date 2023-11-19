const { database } = require("../../../database/database");

function UnblockAccount(request, result)
{
  database.query(`
    DELETE FROM "blocked"
    WHERE blocker = ${request.session.user.id} AND
    "user" = ${request.query.profileId}`,
    
    function(error, data) {
      result.sendStatus(error ? 500 : 200);
    }
  );
}
module.exports = { UnblockAccount }