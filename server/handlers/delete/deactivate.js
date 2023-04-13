const { database } = require("../../database/db_connect");

function DeactivateAccount(request, result)
{
  database.query(`UPDATE accounts SET is_enabled = FALSE WHERE id = ${request.session.user.id}`, (error, results) => {
    if (error) {
      result.sendStatus(500);
    
    } else {
      request.session.destroy();
      result.sendStatus(200);
    }
  });
}
module.exports = { DeactivateAccount }