const { database } = require("../../database/db_connect");

function CreateChat(request, result)
{
  database.query(`
    DO
    $do$
    BEGIN
      IF NOT EXISTS (
        SELECT user_one, user_two
        FROM active_chats
        WHERE user_one=${request.query.userId} AND user_two=${request.session.user.id} OR 
        user_one=${request.session.user.id} AND user_two=${request.query.userId}

      ) THEN
          INSERT INTO active_chats(user_one, user_two) VALUES(${request.session.user.id}, ${request.query.userId});
      END IF;
    END
    $do$`,
    
    function(error, data) {
      if (!error) result.sendStatus(200);
      else result.sendStatus(500);
    })
}
module.exports = { CreateChat }