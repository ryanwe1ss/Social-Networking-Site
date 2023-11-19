const { database } = require("../../../database/database");

function CommentPost(request, result)
{
  database.query(`
    INSERT INTO post_comments (post_id, commenter, comment)
    VALUES (${request.query.post}, ${request.session.user.id}, '${request.query.comment}')`,
    
    function(error, data) {
      if (error) result.sendStatus(500);
      else {
        database.query(`UPDATE statistics SET total_comments = total_comments + 1, last_comment = NOW() WHERE account_id = ${request.session.user.id}`, (error, data) => null);
        result.sendStatus(200);
      }
    }
  );
}
module.exports = { CommentPost }