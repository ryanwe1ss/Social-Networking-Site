const { database } = require("../../database/db_connect");

function LikePost(request, result)
{
  database.query(`
    SELECT COUNT(*)
    FROM post_likes
    WHERE post_id = ${request.query.post} AND
    liker = ${request.session.user.id}`,
  
  function(error, data) {
    if (data.rows[0].count == 0) {
      database.query(`
        INSERT INTO post_likes (post_id, liker)
        VALUES (${request.query.post}, ${request.session.user.id})`,
        
        function(error, data) {
          if (error) result.sendStatus(500);
          else result.sendStatus(200);
        }
      );
    
    } else if (data.rows[0].count > 0) {
      database.query(`
        DELETE FROM post_likes
        WHERE post_id = ${request.query.post} AND
        liker = ${request.session.user.id}`,
        
        function(error, data) {
          if (error) result.sendStatus(500);
          else result.sendStatus(200);
        }
      );
    }
  })
}
module.exports = { LikePost }