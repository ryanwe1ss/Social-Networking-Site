const { database } = require("../../../database/database");

function FetchConversation(request, result)
{
  let chatId = null;
  let username = null;

  database.query(`
    SELECT
      id AS chat_id,
      (SELECT username FROM accounts WHERE id = ${request.query.userId}) AS user
    FROM active_chats
    WHERE user_one = ${request.session.user.id} AND user_two = ${request.query.userId}
    OR user_one = ${request.query.userId} AND user_two = ${request.session.user.id}`,

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
    WHERE from_user = ${request.session.user.id} AND to_user = ${request.query.userId}
    OR from_user = ${request.query.userId} AND to_user = ${request.session.user.id}
    ORDER BY date_created ASC`,

    function(error, data) {
      if (!error) {
        result.send({
          chatId: chatId,
          username: username,
          messages: data.rows,
        });

        database.query(`
          UPDATE messages
          SET
            has_read = TRUE
          WHERE
            from_user = ${request.query.userId} AND
            to_user = ${request.session.user.id}`,

          function(error, data) {
            if (error) console.log(`Error updating messages for user ${request.session.user.id}: ${error}`);
          }
        );
      
      } else result.sendStatus(500);
    }
  )
}
module.exports = { FetchConversation }