const fs = require("fs");

function GetPicture(request, result)
{
  try {
    result.send(
      fs.readFileSync(`images/${request.query.id}_profile.png`)
    );
  
  } catch(error) {
    error => null;
  }
}
module.exports = { GetPicture }