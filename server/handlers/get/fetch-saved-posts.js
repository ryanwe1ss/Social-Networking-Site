const { database } = require("../../database/db_connect");
const fs = require("fs");

function FetchSavedPosts(request, result)
{
  const posts = [];

  database.query(`
    SELECT
      saved_posts.id AS id,
      posts.id AS post_id,
      JSON_BUILD_OBJECT(
        'id', (SELECT id FROM accounts WHERE id = posts.creator_id),
        'username', (SELECT username FROM accounts WHERE id = posts.creator_id),
        'name', (SELECT name FROM accounts WHERE id = posts.creator_id)
      ) AS poster,
      (SELECT COUNT(*) FROM post_likes WHERE posts.id = post_id) AS likes,
      (SELECT COUNT(*) FROM post_comments WHERE posts.id = post_id) AS COMMENTS,
      posts.description,
      posts.file_path,
      posts.date_created
    FROM
      saved_posts
    JOIN
      posts ON posts.id = saved_posts.post_id
    WHERE
      (SELECT is_enabled FROM accounts WHERE id = creator_id) AND
      saver_id = ${request.session.user.id}
    ORDER BY
      saved_posts.date_created DESC`,

    function(error, results) {
      if (error) return result.sendStatus(500);
      results.rows.forEach(post => {
        posts.push({
          id: post.id,
          post_id: post.post_id,
          poster: post.poster,

          likes: post.likes,
          comments: post.comments,
          description: post.description,

          image: fs.readFileSync(post.file_path, "base64"),
          date_created: post.date_created,
        });
      });
      result.send({ posts: posts.slice(0, request.query.limit), count: posts.length });
    }
  );
}
module.exports = { FetchSavedPosts }