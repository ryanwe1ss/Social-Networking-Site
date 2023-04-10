const { database } = require("../../database/db_connect");

function FollowAccount(request, result)
{
  database.query(`
    INSERT INTO follow_requests (follower_id, account_id)
    VALUES ('${request.session.user.id}', '${request.query.profileId}')`,
  
    function(error, data) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { FollowAccount }