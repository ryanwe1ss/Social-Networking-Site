const formidable = require('formidable');
const fs = require('fs');

function UploadPost(request, result)
{
  const form = new formidable.IncomingForm();
  form.on("file", function (field, file) {

    console.log(file);
    fs.readdir(`./data/posts/${request.query.id}/`, (err, files) => {
      fs.renameSync(
        file.filepath,
        `./data/posts/${request.query.id}/${files.length + 1}.png`,
        
        (error) => {
          if (error) {
            console.log(`Error Uploading Post for ID: ${request.query.id}`);
            result.sendStatus(500);
            return;
          }
      });
    });
  });
  form.parse(request);
  result.sendStatus(200);
}
module.exports = { UploadPost }