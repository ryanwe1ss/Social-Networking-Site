const { database } = require("../../database/db_connect");

function UpdatePrivacy(request, result)
{
  const private = request.query.private === "true";
  
  database.query(`
    UPDATE accounts
    SET is_private = ${private}
    WHERE id = ${request.session.user.id}`,
    
    function (error, results) {
      if (error) return result.sendStatus(500);
      result.sendStatus(200);
    }
  );
}
module.exports = { UpdatePrivacy }