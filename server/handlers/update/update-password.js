const { database } = require("../../database/db_connect");

function UpdatePassword(request, result)
{
  const password = request.query.password;
  if (password.length < 5 || password.length > 20) {
    result.sendStatus(400);
    return;
  }

  database.query(`
    UPDATE accounts
    SET password = '${password}'
    WHERE id = ${request.session.user.id}`,

    function (error, data) {
      if (error) {
        result.sendStatus(500);
        return;
      }
      result.sendStatus(200);
    }
  );
}
module.exports = { UpdatePassword }