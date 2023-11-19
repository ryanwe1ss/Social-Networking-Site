const { database } = require("../../../database/database");
const crypto = require('crypto');

function UpdatePassword(request, result)
{
  const hash = crypto.createHash('sha256');
  let password = request.query.password;
  
  if (password.length < 5 || password.length > 20) {
    result.sendStatus(400);
    return;
  }

  hash.update(password);
  database.query(`
    UPDATE
      accounts
    SET
      password = '${hash.digest('hex')}'
    WHERE
      id = ${request.session.user.id}`,

    function (error, data) {
      result.sendStatus(error ? 500 : 200);
    }
  );
}
module.exports = { UpdatePassword }