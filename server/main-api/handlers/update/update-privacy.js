const { database } = require("../../../database/database");

function UpdatePrivacy(request, result)
{
  const private = request.query.private == "true";
  
  database.query(`
    UPDATE
      accounts
    SET
      is_private = ${private}
    WHERE
      id = ${request.session.user.id}`,
    
    function (error, results) {
      result.sendStatus(error ? 500 : 200);
    }
  );
}
module.exports = { UpdatePrivacy }