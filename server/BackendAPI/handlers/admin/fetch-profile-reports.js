const { database } = require("../../database/db_connect");

function FetchProfileReports(request, result)
{
  const searchQuery = request.query.searchQuery;
  database.query(`
    SELECT
      profile_reports.id,
      profile_reports.message,
      profile_reports.date_created,

      JSON_BUILD_OBJECT(
        'id', reporter_id,
        'username', reporter.username,
        'name', reporter.name
      ) AS reporter,
      
      JSON_BUILD_OBJECT(
        'id', reported_id,
        'username', reported.username,
        'name', reported.name
      ) AS reported
    FROM
      profile_reports
    LEFT JOIN
      accounts AS reporter ON reporter.id = profile_reports.reporter_id
    LEFT JOIN
      accounts AS reported ON reported.id = profile_reports.reported_id
    WHERE
      reporter.username ILIKE '%${searchQuery}%' OR
      reported.username ILIKE '%${searchQuery}%' OR
      reporter.name ILIKE '%${searchQuery}%' OR
      reported.name ILIKE '%${searchQuery}%' OR
      profile_reports.message ILIKE '%${searchQuery}%'`,
    
    (error, reports) => {
      if (error) return result.sendStatus(500);
      return result.send(reports.rows);
    }
  );
}
module.exports = { FetchProfileReports }