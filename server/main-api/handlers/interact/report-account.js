const { database } = require("../../../database/database");

function ReportAccount(request, result)
{
  const reportMessage = request.body.message.trim();
  if (reportMessage.length < 5 || reportMessage.length > 250) return result.sendStatus(400);

  database.query(`
    SELECT
      MAX(date_created) AS last_reported
    FROM
      profile_reports
    WHERE
      reporter_id = ${request.session.user.id} AND
      reported_id = ${request.body.id}`,
  
    function (error, data) {
      if (error) return result.sendStatus(500);
      
      const lastReported = data.rows[0].last_reported;
      if (lastReported && (new Date() - new Date(lastReported)) < 10800000) return result.sendStatus(429);
      
      database.query(`
        INSERT INTO profile_reports (reporter_id, reported_id, message)
        VALUES (${request.session.user.id}, ${request.body.id}, '${reportMessage}')`,
        
        function(error, data) {
          if (error) result.sendStatus(500);
          else result.sendStatus(200);
        }
      );
    }
  );
}
module.exports = { ReportAccount }