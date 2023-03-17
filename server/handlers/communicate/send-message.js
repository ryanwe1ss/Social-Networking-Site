const { database } = require("../../database/db_connect");

function SendMessage(request, result)
{
  database.query(`
    INSERT INTO messages (chat_id, from_user, to_user, message)
    VALUES(
      ${request.body.chat_id},
      ${request.body.from_user},
      ${request.body.to_user},
      '${request.body.message}'
    )`,

    function(error, response) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { SendMessage }