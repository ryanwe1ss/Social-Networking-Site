const fs = require("fs");

function FetchThumbnail(request, result)
{
  try {
    result.send(
      fs.readFileSync(`data/thumbnails/${request.query.id}_profile_thumbnail.png`)
    );
  
  } catch(error) {
    result.sendStatus(500);
  }
}
module.exports = { FetchThumbnail }