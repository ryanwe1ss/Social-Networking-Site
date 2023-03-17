const { database } = require("../../database/db_connect");
const formidable = require('formidable');
const fs = require('fs');

function UploadPost(request, result)
{
  const form = new formidable.IncomingForm();

  form.on("file", function (field, file) {
    fs.readdir(`./data/posts/${request.query.id}/`, (err, files) => {
      const newPost = files.length > 0
        ? parseInt(files[files.length - 1].split('.')[0]) + 1
        : 1;

      fs.renameSync(
        file.filepath,
        `./data/posts/${request.query.id}/${newPost}.png`,
        
        (error) => {
          if (error) {
            console.log(`Error Uploading Post for ID: ${request.query.id}`);
            result.sendStatus(500);
            return;
          }
      });

      database.query(`
        INSERT INTO posts
        (creator, description, file, "comment", "like")
        VALUES (
          ${request.query.id},
          '${request.query.description}',
          ${newPost},
          ${request.query.comment},
          ${request.query.like}
        )`,
      
      function(error, data) {
        if (error) {
          console.log(`Error Creating Post Entry for ID: ${request.query.id}`);
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