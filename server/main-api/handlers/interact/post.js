const { database } = require("../../../database/database");

function UploadPost(request, result)
{
  const description = request.body.description;
  const comment = request.body.comment;
  const like = request.body.like;

  database.query(`
    SELECT COALESCE(MAX(file_name), 0) AS newid FROM posts`,
    
    (error, results) => {
      if (error) return result.sendStatus(500);

      const newPost = parseInt(results.rows[0].newid) + 1;
      database.query(`
        INSERT INTO posts
        (creator_id, description, "comment", "like", file_name)
        VALUES (
          ${request.session.user.id},
          '${description}',
          ${comment},
          ${like},
          ${newPost}
        )`,
      
        function(error, results) {
          if (error) return result.sendStatus(500);
          result.status(200).send({
            fileName: newPost,
            session: request.session.user
          });

          database.query(`UPDATE statistics SET total_posts = total_posts + 1, last_post = NOW() WHERE account_id = ${request.session.user.id}`, (error, data) => null);
        }
      );
    }
  );
}
module.exports = { UploadPost }