const { database } = require("./db_connect");

function RemoveConnection(request, result)
{
  const sessionId = request.query.id;
  const userId = request.query.userId;
  const type = request.query.type;

  if (type == "following") {
    console.log(request.query);
    database.query(`
      DELETE FROM connections
      WHERE follower = ${sessionId} AND
      "user" = ${userId}`, function(error, data) {
        if (!error) result.send("success");
      }
    );
  
  } else if (type == "followers") {
    database.query(`
      DELETE FROM connections
      WHERE follower = ${userId} AND
      "user" = ${sessionId}`, function(error, data) {
        if (!error) result.send("success");
      }
    );
  }
}
module.exports = { RemoveConnection }