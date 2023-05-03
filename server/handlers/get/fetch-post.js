const { database } = require("../../database/db_connect");
const fs = require("fs");

function FetchPost(request, result)
{
  database.query(`
    SELECT
      (SELECT EXISTS(SELECT * FROM post_likes
        WHERE liker = ${request.session.user.id}
        AND post_id = ${request.query.post})
        AS is_liked
      ),

      (SELECT EXISTS(SELECT * FROM saved_posts
        WHERE post_id = ${request.query.post}
        AND saver_id = ${request.session.user.id})
        AS is_favorited
      ),

      (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'commenter', JSON_BUILD_OBJECT('id', commenter, 'username', (SELECT username FROM accounts WHERE id = commenter)),
        'comment', comment,
        'date_created', date_created
      )) AS comments FROM post_comments WHERE post_id = ${request.query.post} AND (SELECT is_enabled FROM accounts WHERE id = commenter)) as comments,

      (SELECT username FROM accounts WHERE id = ${request.query.profileId}) as username,
      CAST((SELECT COUNT(*) FROM post_likes WHERE post_id = ${request.query.post} AND (SELECT is_enabled FROM accounts WHERE id = post_likes.liker)) AS INT) AS likes,
      (SELECT is_enabled FROM accounts WHERE id = ${request.query.profileId}) AS is_enabled,
      CAST(creator_id AS INT),
      CAST(posts.id AS INT),
      description,
      posts.comment AS comments_enabled,
      "like" AS likes_enabled,
      posts.date_created
    FROM
      posts
    WHERE
      posts.id = ${request.query.post} AND
      creator_id = ${request.query.profileId} AND NOT
      (SELECT EXISTS(SELECT * FROM "blocked" WHERE "user" = ${request.session.user.id} AND blocker = creator_id))`,
    
    function(error, data) {
      if (!error && data.rows[0] !== undefined) {
        result.send({
          creator: data.rows[0],
          post: fs.readFileSync(`data/posts/${request.query.profileId}/${request.query.post}.png`, "base64"),
        });
      
      } else result.sendStatus(500);
    })
}
module.exports = { FetchPost }