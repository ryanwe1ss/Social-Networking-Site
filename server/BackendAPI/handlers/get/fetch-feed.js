const { database } = require("../../database/db_connect");

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
    WHERE
      (SELECT is_enabled FROM accounts WHERE id = creator_id) AND
      (SELECT EXISTS(SELECT * FROM connections WHERE follower = ${request.session.user.id} AND account = creator_id)) AND
      NOT (SELECT EXISTS(SELECT * FROM "blocked" WHERE "user" = ${request.session.user.id} AND blocker = creator_id)) AND
      NOT creator_id = ${request.session.user.id}
    ORDER BY
      date_created DESC`,

  function(error, data) {
    if (!error) {
      data.rows.forEach(post => {
        posts.push({
          id: post.id,
          creatorId: post.creator_id,
          fileName: post.file_name,

          creatorUsername: post.username,
          description: post.description,

          likes: post.likes,
          comments: post.comments,

          dateCreated: post.date_created,
        });
      });
      result.send(posts);
    }
  });
}
module.exports = { FetchFeed }