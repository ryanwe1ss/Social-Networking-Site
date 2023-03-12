const { database } = require("../../database/db_connect");

function GetConversation(request, result)
{
  let chatId = null;
  let username = null;

  database.query(`
    SELECT
      id AS chat_id,
      (SELECT username FROM accounts WHERE id = ${request.query.userId}) AS user
    FROM active_chats
    WHERE user_one = ${request.query.id} AND user_two = ${request.query.userId}
    OR user_one = ${request.query.userId} AND user_two = ${request.query.id}`,

    function(error, data) {
      if (!error) {
        chatId = data.rows[0].chat_id;
        username = data.rows[0].user;
      }
    }
  )

  database.query(`
    SELECT
      id,
      CAST(from_user AS INT),
      CAST(to_user AS INT),
      (SELECT username FROM accounts WHERE id = from_user) AS from,
      (SELECT username FROM accounts WHERE id = to_user) AS to,
      message,
      date_created
    FROM messages
    WHERE from_user = ${request.query.id} AND to_user = ${request.query.userId}
    OR from_user = ${request.query.userId} AND to_user = ${request.query.id}
    ORDER BY date_created ASC`,

    function(error, data) {
      if (!error) {
        result.send({
          chatId: chatId,
          username: username,
          messages: data.rows,
        });
      }
    }
  )
}
module.exports = { GetConversation }