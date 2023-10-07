const { database } = require("../../../database/database");

function FollowAccount(request, result)
{
  database.query(`
    SELECT is_private
    FROM accounts
    WHERE id = '${request.query.profileId}'`,
  
    function(error, data) {
      if (error) return result.sendStatus(500);

      if (data.rows[0].is_private) {
        database.query(`
          INSERT INTO follow_requests (follower_id, account_id)
          VALUES ('${request.session.user.id}', '${request.query.profileId}')`,
        
          function(error, data) {
            if (error) result.sendStatus(500);
            else result.sendStatus(200);
          }
        );
      
      } else {
        database.query(`
          INSERT INTO connections (account, follower)
          VALUES (${request.query.profileId}, ${request.session.user.id})`,
        
          function(error, data) {
            if (error) result.sendStatus(500);
            else result.sendStatus(200);
          }
        );
      }
    }
  );

  database.query(`UPDATE statistics SET total_follows = total_follows + 1, last_follow = NOW() WHERE account_id = ${request.query.profileId}`, (error, data) => {
    if (error) console.log(`Error updating follow statistic for account: ${request.query.profileId}`);
  });
}
module.exports = { FollowAccount }