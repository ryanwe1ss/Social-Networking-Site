const { database } = require("../../database/db_connect");

function DeclineFollowRequest(request, result)
{
  database.query(`
    UPDATE follow_requests
    SET declined = TRUE
    WHERE
      id = ${request.query.id} AND
      follower_id = ${request.query.followerId} AND
      account_id = ${request.session.user.id}`,
  
    function(error, data) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { DeclineFollowRequest }