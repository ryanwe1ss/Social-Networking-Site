const { database } = require("../../../database/database");

function AcceptFollowRequest(request, result)
{
  database.query(`
    INSERT INTO connections (account, follower)
    VALUES ('${request.session.user.id}', '${request.query.followerId}')`,
  
    function(error, data) {
      if (error) return result.sendStatus(500);

      database.query(`
        UPDATE follow_requests
        SET accepted = TRUE
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
  );
}
module.exports = { AcceptFollowRequest }