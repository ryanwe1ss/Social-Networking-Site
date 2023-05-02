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
        (creator_id, description, "comment", "like", file_path)
        VALUES (
          ${request.session.user.id},
          '${request.query.description}',
          ${request.query.comment},
          ${request.query.like},
          'data/posts/${request.session.user.id}/' || CURRVAL('posts_id_seq') || '.png'
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

          database.query(`UPDATE statistics SET total_posts = total_posts + 1, last_post = NOW() WHERE account_id = ${request.session.user.id}`, (error, data) => {
            if (error) console.log(`Error updating post statistic for account: ${request.session.user.id}`);
          });
        });
      });
    })
  });
  form.parse(request, (error, fields, files) => {
    if (Object.keys(files).length == 0) return result.sendStatus(500);
    result.sendStatus(200);
  });
}
module.exports = { UploadPost }