const { database } = require("./db_connect");

function Session(request, result)
{
  database.query(`
    SELECT COUNT(*) FROM active_sessions
    WHERE id = ${request.query.id}`,
    
    function(error, data) {
      console.log(data.rows);
      result.send(data.rows);
  })
}
module.exports = { Session }