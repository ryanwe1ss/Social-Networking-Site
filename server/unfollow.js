const { database } = require("./db_connect");

function UnfollowAccount(request, result)
{
  const user = request.query;
  database.query(`
    DELETE FROM communications
    WHERE follower = ${request.query.id} AND
    "user" = ${request.query.profileId}`, function(error, data) {
      if (!error) result.send("success");
    }
  );
}
module.exports = { UnfollowAccount }