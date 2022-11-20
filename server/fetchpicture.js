const fs = require("fs");

function FetchPicture(request, result)
{
  try {
    result.send(
      fs.readFileSync(`images/${request.query.id}_profile.png`)
    );
  
  } catch(error) {
    error => null;
  }
}
module.exports = { FetchPicture }