const { database } = require("../../database/db_connect");

function FollowAccount(request, result)
{
  database.query(`
    INSERT INTO connections ("follower", "user")
    VALUES ('${request.session.user.id}', '${request.query.profileId}')`,
    
    function(error, data) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { FollowAccount }