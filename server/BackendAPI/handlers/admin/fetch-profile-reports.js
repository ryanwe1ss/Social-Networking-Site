const { database } = require("../../database/db_connect");

function FetchProfileReports(request, result)
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
        'username', (SELECT username FROM accounts WHERE id = reported_id),
        'name', (SELECT name FROM accounts WHERE id = reported_id)
      ) AS reported,
      message,
      date_created
    FROM
      profile_reports`,
    
    (error, reports) => {
      if (error) return result.sendStatus(500);
      return result.send(reports.rows);
    }
  );
}
module.exports = { FetchProfileReports }