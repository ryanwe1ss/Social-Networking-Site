const { database } = require("../../database/db_connect");

function CommentPost(request, result)
{
  database.query(`
    INSERT INTO post_comments (post_id, commenter, comment)
    VALUES (${request.query.post}, ${request.session.user.id}, '${request.query.comment}')`,
    
    function(error, data) {
      if (!error) result.sendStatus(200);
      else result.sendStatus(500);
    }
  );
}
module.exports = { CommentPost }