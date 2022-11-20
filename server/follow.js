const { database } = require("./db_connect");

function FollowAccount(request, result)
{
  const user = request.query;
  database.query(`
    INSERT INTO connections ("follower", "user")
    VALUES ('${user.id}', '${user.profileId}')`, function(error, data) {
      if (!error) result.send("success");
    }
  );
}
module.exports = { FollowAccount }