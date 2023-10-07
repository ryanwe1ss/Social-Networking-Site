const { database } = require("../../../database/database");

function FetchChats(request, result)
{
  database.query(`
    SELECT
      CAST(user_one AS INT) AS user_one_id,
      CAST(user_two AS INT) AS user_two_id,
      (SELECT username FROM accounts WHERE id = active_chats.user_one) AS user_one,
      (SELECT username FROM accounts WHERE id = active_chats.user_two) AS user_two
    FROM
      active_chats
    WHERE
      (SELECT is_enabled
        FROM accounts
        WHERE active_chats.user_one = id AND active_chats.user_two = ${request.session.user.id} OR
        active_chats.user_one = ${request.session.user.id} AND active_chats.user_two = id
      ) AND (
        user_one = ${request.session.user.id} OR
        user_two = ${request.session.user.id}
      )`,

    function(error, data) {
      if (!error) result.send(data.rows);
    }
  )
}
module.exports = { FetchChats }