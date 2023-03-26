const { database } = require("../../database/db_connect");
const formidable = require('formidable');
const fs = require('fs');

function UploadPost(request, result)
{
  const form = new formidable.IncomingForm();

  form.on("file", function (field, file) {
    fs.readdir(`./data/posts/${request.session.user.id}/`, (err, files) => {

      database.query(`
        INSERT INTO posts
        (creator, description, "comment", "like")
        VALUES (
          ${request.session.user.id},
          '${request.query.description}',
          ${request.query.comment},
          ${request.query.like}
        )`,
      
      function(error, data) {
        if (error) {
          console.log(`Error Creating Post Entry for ID: ${request.session.user.id}`);
          result.sendStatus(500);
          return;
        }

        database.query('SELECT COALESCE(MAX(id)) AS newid FROM posts', function(error, data) {
          const newPost = data.rows[0].newid;

          fs.renameSync(
            file.filepath,
            `./data/posts/${request.session.user.id}/${newPost}.png`,
            
            (error) => {
              if (error) {
                console.log(`Error Uploading Post for ID: ${request.session.user.id}`);
                result.sendStatus(500);
                return;
              }
          });
        });
      })
    });
  });
  form.parse(request);
  result.sendStatus(200);
}
module.exports = { UploadPost }