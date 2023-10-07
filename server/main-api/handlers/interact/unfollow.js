const { database } = require("../../../database/database");

function UnfollowAccount(request, result)
{
  database.query(`
    DELETE FROM connections
    WHERE follower = ${request.session.user.id} AND
    account = ${request.query.profileId}`,
    
    function(error, data) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { UnfollowAccount }