const { database } = require("../../database/db_connect");

function FetchReportReasons(request, result)
{
  database.query(`
    SELECT * FROM report_reasons
    ORDER BY id DESC`,
    
    function(error, reasons) {
      if (error) return result.sendStatus(500);
      result.send(reasons.rows);
    }
  );
}
module.exports = { FetchReportReasons }