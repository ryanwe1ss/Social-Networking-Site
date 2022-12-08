const { database } = require("../../database/db_connect");

function GetChats(request, result)
{
  database.query(`
    SELECT
      CAST(user_one AS INT) AS user_one_id,
      CAST(user_two AS INT) AS user_two_id,
      (SELECT username FROM accounts WHERE id = active_chats.user_one) AS user_one,
      (SELECT username FROM accounts WHERE id = active_chats.user_two) AS user_two
    FROM active_chats
    WHERE user_one = ${request.query.id} or user_two = ${request.query.id}`,

    function(error, data) {
      if (!error) result.send(data.rows);
    }
  )
}
module.exports = { GetChats }