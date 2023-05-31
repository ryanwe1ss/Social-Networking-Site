const { database } = require("../../database/db_connect");

function DeleteConnection(request, result)
{
  const sessionId = request.session.user.id;
  const userId = request.query.userId;
  const type = request.query.type;

  if (type == "following") {
    database.query(`
      DELETE FROM connections
      WHERE follower = ${sessionId} AND
      account = ${userId}`, function(error, data) {
        if (error) result.sendStatus(500);
        else result.sendStatus(200);
      }
    );
  
  } else if (type == "followers") {
    database.query(`
      DELETE FROM connections
      WHERE follower = ${userId} AND
      account = ${sessionId}`, function(error, data) {
        if (error) result.sendStatus(500);
        else result.sendStatus(200);
      }
    );
  }
}
module.exports = { DeleteConnection }