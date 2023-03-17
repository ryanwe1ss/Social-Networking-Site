const fs = require("fs");

function FetchPicture(request, result)
{
  try {
    result.send(
      fs.readFileSync(`data/images/${request.query.id}_profile.png`)
    );
  
  } catch(error) {
    result.sendStatus(500);
  }
}
module.exports = { FetchPicture }