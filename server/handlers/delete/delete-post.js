const { database } = require("../../database/db_connect");
const fs = require('fs');

function DeletePost(request, result)
{
  const post = `data/posts/${request.session.user.id}/${request.query.post}.png`;
  
  if (fs.existsSync(post)) {
    database.query(`
      DELETE FROM posts
      WHERE id = ${request.query.post} AND
      creator_id = ${request.session.user.id}`,
      
      function(error, data) {
        if (error) return result.sendStatus(500);
        fs.unlinkSync(post);
        result.sendStatus(200);
      }
    );
  
  } else result.sendStatus(500);
}
module.exports = { DeletePost }