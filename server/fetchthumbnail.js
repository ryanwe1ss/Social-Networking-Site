const fs = require("fs");

function FetchThumbnail(request, result)
{
  try {
    result.send(
      fs.readFileSync(`images/thumbnails/${request.query.id}_profile_thumbnail.png`)
    );
  
  } catch(error) {
    error => null;
  }
}
module.exports = { FetchThumbnail }