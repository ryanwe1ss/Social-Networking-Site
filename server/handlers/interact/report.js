const { database } = require("../../database/db_connect");

function ReportAccount(request, result)
{
  database.query(`
    INSERT INTO reports (reporter_id, reported_id, message)
    VALUES (${request.session.user.id}, ${request.query.id}, '${request.query.message}')`,
    
    function(error, data) {
      if (error) result.sendStatus(500);
      else result.sendStatus(200);
    }
  );
}
module.exports = { ReportAccount }