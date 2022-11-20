const fs = require("fs");

function FetchPicture(request, result)
{
  try {
    result.send(
      fs.readFileSync(`images/${request.query.id}_default.png`)
    );
  
  } catch(error) {
    result.sendStatus(204);
  }
}
module.exports = { FetchPicture }