const { database } = require("../../database/db_connect");

function FetchPosts(request, result)
{
  /*
  database.query(`
    SELECT 
      is_private,
      (SELECT EXISTS(
        SELECT * FROM connections
        WHERE account = ${request.session.user.id} AND follower = ${request.query.id} OR
        account = ${request.query.id} AND follower = ${request.session.user.id})
      ) AS has_connection
    FROM
      accounts
    WHERE
      id = ${request.session.user.id}`,

    (error, results) => {
      console.log(results[0]);

      if (error) return result.status(500).send("error");
      result.status(200).send({
        is_private: results[0].is_private,
        has_connection: results[0].has_connection
      });
    }
  );
  */

  /*
  const posts = [];
  const profileId = request.query.id;
  const files = fs.readdirSync(`data/posts/${profileId}`);

  for (let file = files.length - 1; file >= 0; file--)
  {
    posts.push({
      id: files[file].split('.')[0],
      image: fs.readFileSync(`data/posts/${profileId}/${files[file]}`, "base64"),
    });
  }
  result.send({ posts: posts.slice(0, request.query.limit), count: posts.length });
  */
}
module.exports = { FetchPosts }