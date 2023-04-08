const { database } = require("../../database/db_connect");

function UnblockAccount(request, result)
{
  database.query(`
    DELETE FROM "blocked"
    WHERE blocker = ${request.session.user.id} AND
    "user" = ${request.query.id}`,
    
    function(error, data) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { UnblockAccount }