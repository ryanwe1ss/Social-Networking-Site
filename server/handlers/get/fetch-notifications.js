const { database } = require("../../database/db_connect");

function FetchNotifications(request, result)
{
  if (request.query.countOnly) {
    database.query(`
      SELECT
        COUNT(*) AS count
      FROM
        follow_requests
      WHERE
        account_id = ${request.session.user.id}`,

      function(error, data) {
        if (!error) result.send(data.rows[0]);
      }
    );
  
  } else {
    database.query(`
      SELECT
        follow_requests.id,
        JSON_BUILD_OBJECT(
          'id', account_id,
          'username', username,
          'name', name
        ) AS account,
        JSON_BUILD_OBJECT(
          'id', follower_id,
          'username', (SELECT username FROM accounts WHERE id = follower_id),
          'name', (SELECT name FROM accounts WHERE id = follower_id)
        ) AS follower,
        accepted,
        declined,
        follow_requests.date_created
      FROM
        accounts
      LEFT JOIN
        follow_requests ON follow_requests.account_id = accounts.id
      WHERE
        follow_requests.account_id = ${request.session.user.id} AND
        is_enabled = TRUE`,
    
      function(error, data) {
        if (!error) result.send(data.rows);
      }
    );
  }
}
module.exports = { FetchNotifications }