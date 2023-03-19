const { database } = require("../../database/db_connect");
const fs = require("fs");

function FetchPost(request, result)
{
  console.log(request.query);

  database.query(`
    SELECT
      (SELECT username FROM accounts WHERE id = ${request.query.profileId}) as username,
      (SELECT EXISTS(SELECT * FROM post_likes
        WHERE liker = ${request.query.accountId}
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
      "like" AS likes_enabled
    FROM
      posts
    WHERE
      id = ${request.query.post} AND creator = ${request.query.profileId}`,
    
    function(error, data) {
      if (!error) {
        result.send({
          creator: data.rows[0],
          post: fs.readFileSync(`data/posts/${request.query.profileId}/${request.query.post}.png`, "base64"),
        });
      
      } else result.sendStatus(500);
    })
}
module.exports = { FetchPost }