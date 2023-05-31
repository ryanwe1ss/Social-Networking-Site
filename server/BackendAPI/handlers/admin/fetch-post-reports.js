const { database } = require("../../database/db_connect");

function FetchPostReports(request, result)
{
  database.query(`
    SELECT
      id,
      JSON_BUILD_OBJECT(
        'id', reporter_id,
        'username', (SELECT username FROM accounts WHERE id = reporter_id),
        'name', (SELECT name FROM accounts WHERE id = reporter_id)
      ) AS reporter,
      JSON_BUILD_OBJECT(
        'id', reported_id,
        'post_id', post_id
      ) AS post,
      (SELECT reason FROM report_reasons WHERE id = post_reports.reason) AS reason,
      additional_information,
      date_created
    FROM
      post_reports`,
    
    (error, reports) => {
      if (error) return result.sendStatus(500);
      return result.send(reports.rows);
    }
  );
}
module.exports = { FetchPostReports }