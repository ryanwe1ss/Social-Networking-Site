const { database } = require("./db_connect");

function UnfollowAccount(request, result)
{
  database.query(`
    DELETE FROM connections
    WHERE follower = ${request.query.id} AND
    "user" = ${request.query.profileId}`, function(error, data) {
      if (!error) result.send("success");
    }
  );
}
module.exports = { UnfollowAccount }