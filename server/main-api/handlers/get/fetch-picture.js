const { database } = require("../../../database/database");
const fs = require("fs");

function FetchPicture(request, result)
{
  database.query(`
    SELECT * FROM accounts WHERE username='${request.query.username}' AND is_enabled=TRUE`,

    function(error, results) {
      if (!error && results.rows.length > 0) {
        const profileId = results.rows[0].id;

        try {
          result.send(
            fs.readFileSync(`data/images/${profileId}_profile.png`)
          );
        
          } catch(error) {
            result.sendStatus(500);
          }
      
      } else result.sendStatus(500);
    }
  );
}
module.exports = { FetchPicture }