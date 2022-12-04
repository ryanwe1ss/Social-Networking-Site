const { database } = require("../../database/db_connect");

function GetChats(request, result)
{
  database.query(`
    SELECT
      (SELECT username from accounts where id = messages.from_user) AS from_user,
      (SELECT username from accounts where id = messages.to_user) AS to_user
    FROM active_chats
    LEFT JOIN messages ON messages.chat_id = active_chats.id
    WHERE from_user = ${request.query.id} or to_user = ${request.query.id}`,

    function(error, data) {
      if (!error) result.send(data.rows);
    }
  )
}
module.exports = { GetChats }