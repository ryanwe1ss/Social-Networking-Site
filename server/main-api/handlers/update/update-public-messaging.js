const { database } = require("../../../database/database");

function UpdatePublicMessaging(request, result)
{
  const publicMessaging = request.query.publicMessaging === "true";

  database.query(`
    UPDATE accounts
    SET public_messaging = ${publicMessaging}
    WHERE id = ${request.session.user.id}`,

    function (error, results) {
      if (error) return result.sendStatus(500);
      result.sendStatus(200);
    }
  );
}
module.exports = { UpdatePublicMessaging }