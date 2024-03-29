const { database } = require("../../../database/database");

function FavoritePost(request, result)
{
  database.query(`
    SELECT COUNT(*)
    FROM saved_posts
    WHERE post_id = ${request.query.post} AND
    saver_id = ${request.session.user.id}`,
    
    function(error, results) {
      if (results.rows[0].count == 0) {
        database.query(`
          INSERT INTO saved_posts (saver_id, post_id)
          VALUES (${request.session.user.id}, ${request.query.post})`,
          
          function(error, results) {
            result.sendStatus(error ? 500 : 200);
          }
        );
      
      } else {
        database.query(`
          DELETE FROM saved_posts
          WHERE post_id = ${request.query.post} AND
          saver_id = ${request.session.user.id}`,
          
          function(error, results) {
            result.sendStatus(error ? 500 : 200);
          }
        );
      }
    }
  );
}
module.exports = { FavoritePost }