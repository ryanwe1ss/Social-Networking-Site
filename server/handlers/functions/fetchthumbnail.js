const fs = require("fs");

function FetchThumbnail(request, result)
{
  try {
    result.send(
      fs.readFileSync(`images/thumbnails/${request.query.id}_profile_thumbnail.png`)
    );
  
  } catch(error) {
    result.sendStatus(204);
  }
}
module.exports = { FetchThumbnail }