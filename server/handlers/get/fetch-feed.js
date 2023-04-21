const { database } = require("../../database/db_connect");
const fs = require("fs");

function FetchFeed(request, result)
{
  const posts = [];

  database.query(`
    SELECT
      *,
      (SELECT username FROM accounts WHERE creator_id = id),
      (SELECT COUNT(*) FROM post_likes WHERE posts.id = post_id) AS likes,
      (SELECT COUNT(*) FROM post_comments WHERE posts.id = post_id) AS comments
    FROM
      posts
    ORDER BY
      date_created DESC`,

  function(error, data) {
    if (!error) {
      data.rows.forEach(post => {
        posts.push({
          id: post.id,
          creator_id: post.creator_id,

          creator_username: post.username,
          description: post.description,

          likes: post.likes,
          comments: post.comments,

          file: fs.readFileSync(post.file_path, "base64"),
          date_created: post.date_created,
        });
      });
      result.send({ posts: posts.slice(0, request.query.limit), count: posts.length });
    }
  });
}
module.exports = { FetchFeed }