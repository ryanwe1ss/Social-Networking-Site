const { database } = require("../../../database/database");

function UnfollowAccount(request, result)
{
  database.query(`
    DELETE FROM connections
    WHERE follower = ${request.session.user.id} AND
    account = ${request.query.profileId}`,
    
    function(error, data) {
      result.sendStatus(error ? 500 : 200);
    }
  );
}
module.exports = { UnfollowAccount }