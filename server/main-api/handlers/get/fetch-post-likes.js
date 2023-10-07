const { database } = require("../../../database/database");

function FetchPostLikes(request, result)
{
  database.query(`
    SELECT
      id,
      JSON_BUILD_OBJECT(
        'id', liker,
        'username', (SELECT username FROM accounts WHERE id = liker),
        'name', (SELECT name FROM accounts WHERE id = liker)
      ) AS liker
    FROM
      post_likes
    WHERE
      (SELECT is_enabled FROM accounts WHERE id = liker) AND
      post_id = ${request.query.post}`,
    
    function(error, results) {
      if (error) return result.sendStatus(500);
      return result.send(results.rows);
    }
  );
}
module.exports = { FetchPostLikes }