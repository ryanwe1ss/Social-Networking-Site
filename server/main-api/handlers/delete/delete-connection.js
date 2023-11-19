const { database } = require('../../../database/database');

function DeleteConnection(request, result)
{
  const sessionId = request.session.user.id;
  const userId = request.query.userId;
  const type = request.query.type;

  if (type == 'following') {
    database.query(`
      DELETE FROM connections
      WHERE follower = ${sessionId} AND
      account = ${userId}`, function(error, data) {
        result.sendStatus(error ? 500 : 200);
      }
    );
  
  } else if (type == 'followers') {
    database.query(`
      DELETE FROM connections
      WHERE follower = ${userId} AND
      account = ${sessionId}`, function(error, data) {
        result.sendStatus(error ? 500 : 200);
      }
    );
  }
}
module.exports = { DeleteConnection }