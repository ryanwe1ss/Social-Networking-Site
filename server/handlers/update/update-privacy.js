const { database } = require("../../database/db_connect");

function UpdatePrivacy(request, result)
{
  const private = request.query.private === "true";
  
  database.query(`
    UPDATE accounts
    SET is_private = ${private}
    WHERE id = ${request.query.id}`,
    
    function (error, data) {
      if (error) {
        result.sendStatus(500);
        return;
      }
    }
  );
  result.sendStatus(200);
}
module.exports = { UpdatePrivacy }