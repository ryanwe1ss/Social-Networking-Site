const { database } = require("../../database/db_connect");
const fs = require("fs");

function FetchPost(request, result)
{
  database.query(`
    SELECT
      (SELECT username FROM accounts WHERE id = ${request.query.id}) as username,
      JSON_AGG((SELECT commenter, comment FROM post_comments WHERE post_id = ${request.query.id})) as comments,
      CAST((SELECT COUNT(*) FROM post_likes WHERE post_id = ${request.query.id}) AS INT) as likes,
      CAST(creator AS INT),
      description
    FROM
      posts
    WHERE
      creator = ${request.query.id} AND
      file = ${request.query.post}`,
    
    function(error, data) {
      console.log(error);
      // GET COMMENTS for single post
      
      if (!error) {
        result.send({
          creator: data.rows[0],
          post: fs.readFileSync(`data/posts/${request.query.id}/${request.query.post}.png`, "base64"),
        });
      
      } else result.sendStatus(500);
    })
}
module.exports = { FetchPost }