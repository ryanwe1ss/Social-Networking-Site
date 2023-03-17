const fs = require('fs');

function DeletePost(request, result)
{
  const post = `data/posts/${request.query.id}/${request.query.post}.png`;
  console.log(post);

  if (fs.existsSync(post)) {
    fs.unlinkSync(post);
    result.sendStatus(200);
  
  } else result.sendStatus(500);
}
module.exports = { DeletePost }