const { database } = require("../../../database/database");

function FetchChats(request, result)
{
  database.query(`
    SELECT
      active_chats.id AS chat_id,
      COUNT(CASE WHEN messages.has_read IS FALSE AND messages.to_user = ${request.session.user.id} THEN 1 END) AS messages,
      MAX(messages.date_created) AS most_recent_message,

      JSON_BUILD_OBJECT(
        'id', active_chats.user_one,
        'name', userOne.username
      ) AS user_one,
      JSON_BUILD_OBJECT(
        'id', active_chats.user_two,
        'name', userTwo.username
      ) AS user_two
    FROM
      active_chats
    LEFT JOIN
      messages ON messages.chat_id = active_chats.id
    JOIN
      accounts userOne ON active_chats.user_one = userOne.id
    JOIN
      accounts userTwo ON active_chats.user_two = userTwo.id
    WHERE (
      SELECT is_enabled
      FROM accounts
      WHERE active_chats.user_one = id AND active_chats.user_two = ${request.session.user.id}
      OR active_chats.user_one = ${request.session.user.id} AND active_chats.user_two = id

    ) AND (
      active_chats.user_one = ${request.session.user.id} OR
      active_chats.user_two = ${request.session.user.id}
    )
    GROUP BY
      active_chats.id, userOne.id, userTwo.id, userOne.username, userTwo.username
    ORDER BY
      most_recent_message DESC`,

    function(error, data) {
      if (!error) result.send(data.rows);
      else result.sendStatus(500);
    }
  )
}
module.exports = { FetchChats }