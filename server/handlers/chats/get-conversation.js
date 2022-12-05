const { database } = require("../../database/db_connect");

function GetConversation(request, result)
{
  database.query(`
    SELECT
      id,
      CAST(chat_id AS INT),
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
      if (!error) result.send(data.rows);
    }
  )
}
module.exports = { GetConversation }