const { database } = require("../../database/db_connect");
const fs = require("fs");

function FetchPost(request, result)
{
  database.query(`
    SELECT
      (SELECT username FROM accounts WHERE id = ${request.query.profileId}) as username,
      (SELECT EXISTS(SELECT * FROM post_likes
        WHERE liker = ${request.session.user.id}
        AND post_id = ${request.query.post})
        AS is_liked),

      (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'id', id,
        'commenter', JSON_BUILD_OBJECT('id', commenter, 'username', (SELECT username FROM accounts WHERE id = commenter)),
        'comment', comment,
        'date_created', date_created
      )) AS comments FROM post_comments WHERE post_id = ${request.query.post}) as comments,

      CAST((SELECT COUNT(*) FROM post_likes WHERE post_id = ${request.query.post}) AS INT) as likes,
      CAST(creator AS INT),
      CAST(id AS INT),
      description,
      comment AS comments_enabled,
      "like" AS likes_enabled,
      date_created
    FROM
      posts
    WHERE
      id = ${request.query.post}
      AND creator = ${request.query.profileId}
      AND NOT (SELECT EXISTS(SELECT * FROM "blocked" WHERE "user" = ${request.session.user.id} AND blocker = creator))`,
    
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