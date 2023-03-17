const fs = require("fs");

function FetchPosts(request, result)
{
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
}
module.exports = { FetchPosts }