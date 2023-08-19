const { database } = require("../../database/db_connect");

function FetchPostReports(request, result)
{
  database.query(`
    SELECT
      post_reports.id,
      JSON_BUILD_OBJECT(
        'id', reporter.id,
        'username', reporter.username,
        'name', reporter.name
      ) AS reporter,
      JSON_BUILD_OBJECT(
        'id', post_reports.reported_id,
        'post_id', post_id,
            'file', posts.file_name
      ) AS post,
      report_reasons.reason,
      additional_information,
      post_reports.date_created
    FROM
      post_reports
    LEFT JOIN
      accounts AS reporter ON reporter.id = post_reports.reporter_id
    LEFT JOIN
      report_reasons ON report_reasons.id = post_reports.reason
    LEFT JOIN
      posts ON posts.id = post_id`,
    
    (error, reports) => {
      if (error) return result.sendStatus(500);
      return result.send(reports.rows);
    }
  );
}
module.exports = { FetchPostReports }