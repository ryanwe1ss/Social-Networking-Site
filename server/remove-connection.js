const { database } = require("./db_connect");

function RemoveConnection(request, result)
{
  const sessionId = request.query.id;
  const userId = request.query.userId;
  const type = request.query.type;

  if (type == "following") {
    database.query(`
      DELETE FROM connections
      WHERE follower = ${sessionId} AND
      "user" = ${userId}`, function(error, data) {
        if (error) result.sendStatus(500);
      }
    );
  
  } else if (type == "followers") {
    database.query(`
      DELETE FROM connections
      WHERE follower = ${userId} AND
      "user" = ${sessionId}`, function(error, data) {
        if (error) result.sendStatus(500);
      }
    );
  }
}
module.exports = { RemoveConnection }