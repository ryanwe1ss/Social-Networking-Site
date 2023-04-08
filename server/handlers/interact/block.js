const { database } = require("../../database/db_connect");

function BlockAccount(request, result)
{
  database.query(`
    INSERT INTO "blocked" (blocker, "user")
    VALUES (${request.session.user.id}, ${request.query.id})`,
    
    function(error, data) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { BlockAccount }