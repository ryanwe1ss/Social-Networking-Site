const { database } = require("../../../database/database");

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
      result.sendStatus(error ? 500 : 200);
    }
  );
}
module.exports = { DeclineFollowRequest }