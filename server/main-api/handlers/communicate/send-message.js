const { database } = require("../../../database/database");

function SendMessage(request, result)
{
  database.query(`
    INSERT INTO messages (chat_id, from_user, to_user, message)
    VALUES(
      ${request.body.chat_id},
      ${request.session.user.id},
      ${request.body.to_user},
      '${request.body.message}'
    )`,

    function(error, response) {
      if (error) result.sendStatus(500);
      else {
        result.sendStatus(200);

        database.query(`UPDATE statistics SET total_messages_sent = total_messages_sent + 1, last_message_sent = NOW() WHERE account_id = ${request.session.user.id}`,
          (error, data) => {
            if (error) console.log(`Error updating sent messages statistic for account: ${request.session.user.id}`);
          });
      }
    }
  );
}
module.exports = { SendMessage }