const { database } = require("../../database/db_connect");

function BlockAccount(request, result)
{
  database.query(`
    DELETE FROM connections
    WHERE
      account = ${request.session.user.id} AND follower = ${request.query.profileId}
      OR
      account = ${request.query.profileId} AND follower = ${request.session.user.id}`,
  
    function(error, data) {
      if (error) return result.sendStatus(500);

      database.query(`
        INSERT INTO "blocked" (blocker, "user")
        VALUES (${request.session.user.id}, ${request.query.profileId})`,
        
        function(error, data) {
          if (error) result.sendStatus(500);
          else result.sendStatus(200);
        }
      );
    }
  );
}
module.exports = { BlockAccount }