const { database } = require("../../database/db_connect");

function FetchPostReports(request, result)
{
  database.query(`
    SELECT * FROM post_reports`,
    
    (error, reports) => {
      if (error) return result.sendStatus(500);
      return result.send(reports.rows);
    }
  );
}
module.exports = { FetchPostReports }