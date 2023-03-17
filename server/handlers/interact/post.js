const formidable = require('formidable');
const fs = require('fs');

function UploadPost(request, result)
{
  const form = new formidable.IncomingForm();
  form.on("file", function (field, file) {
    fs.readdir(`./data/posts/${request.query.id}/`, (err, files) => {
      const latestFile = files.length > 0
        ? parseInt(files[files.length - 1].split('.')[0]) + 1
        : 1;

      fs.renameSync(
        file.filepath,
        `./data/posts/${request.query.id}/${latestFile}.png`,
        
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