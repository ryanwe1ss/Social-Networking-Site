const { database } = require('../../../database/database');

function CreateChat(request, result)
{
  database.query(`
    SELECT EXISTS (
      SELECT
        1
      FROM
        accounts
      JOIN
        connections ON connections.account = accounts.id
      WHERE
        accounts.id = ${request.query.userId} AND
        accounts.public_messaging IS TRUE OR
        connections.account = ${request.query.userId} AND connections.follower = ${request.session.user.id}
    )`,
    
    function(error, results) {
      if (error) return result.sendStatus(500);
      if (!results.rows[0].exists) return result.sendStatus(403);

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
        
        function(error, results) {
          if (error) result.sendStatus(500);
          else {
            database.query(`
              SELECT
                id
              FROM
                active_chats
              WHERE
                user_one=${request.session.user.id} AND user_two=${request.query.userId} OR 
                user_one=${request.query.userId} AND user_two=${request.session.user.id}`,
                
              function(error, results) {
                if (error) result.sendStatus(500);
                else result.send({ chatId: results.rows[0].id, status: 200 });
              }
            );
          }
        }
      );
    }
  );
}
module.exports = { CreateChat }