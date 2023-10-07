const { database } = require("../../../database/database");

function ReportPost(request, result)
{
  const reason = parseInt(request.body.reason.trim());
  const additionalInformation = request.body.additionalInformation.trim().length > 0 ? request.body.additionalInformation.trim() : null;

  database.query(`
    SELECT * FROM report_reasons`,

    function(error, reasons) {
      if (error) return result.sendStatus(500);
      if (!reasons.rows.some((row) => row.id === reason)) return result.sendStatus(400);

      database.query(`
        SELECT
          MAX(date_created) AS last_reported
        FROM
          post_reports
        WHERE
          reporter_id = ${request.session.user.id} AND
          reported_id = ${request.body.id} AND
          post_id = ${request.body.postId}`,
      
        function(error, data) {
          if (error) return result.sendStatus(500);

          const lastReported = data.rows[0].last_reported;
          if (lastReported && (new Date() - new Date(lastReported)) < 10800000) return result.sendStatus(429);

          database.query(`
            INSERT INTO post_reports(reporter_id, reported_id, post_id, reason, additional_information)
            VALUES(${request.session.user.id}, ${request.body.id}, ${request.body.postId}, ${reason}, ${additionalInformation ? `'${additionalInformation}'` : null})`,

            function(error, reports) {
              if (error) return result.sendStatus(500);
              result.sendStatus(200);
            }
          );
        }
      );
    }
  );
}
module.exports = { ReportPost }