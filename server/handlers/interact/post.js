const { database } = require("../../database/db_connect");
const formidable = require('formidable');
const fs = require('fs');

function UploadPost(request, result)
{
  const form = new formidable.IncomingForm();
  
  form.parse(request, (error, fields, post) => {
    if (Object.keys(post).length == 0) return result.sendStatus(400);

    const description = fields.description.replace(/['";\(\)]/g, '');
    const comment = fields.comment != 'true' && fields.comment != 'false' ? false : fields.comment;
    const like = fields.like != 'true' && fields.like != 'false' ? false : fields.like;

    fs.readdir(`./data/posts/${request.session.user.id}/`, (error, file) => {
      database.query(`
        INSERT INTO posts
        (creator_id, description, "comment", "like", file_path)
        VALUES (
          ${request.session.user.id},
          '${description}',
          ${comment},
          ${like},
          'data/posts/${request.session.user.id}/' || CURRVAL('posts_id_seq') || '.png'
        )`,
      
      function(error, data) {
        if (error) {
          console.log(`Error Creating Post Entry for ID: ${request.session.user.id}`);
          return result.sendStatus(500);
        }

        database.query('SELECT COALESCE(MAX(id)) AS newid FROM posts', function(error, data) {
          const newPost = data.rows[0].newid;

          fs.renameSync(
            post.image.filepath,
            `./data/posts/${request.session.user.id}/${newPost}.png`,
            
            (error) => {
              if (error) {
                console.log(`Error Uploading Post for ID: ${request.session.user.id}`);
                return result.sendStatus(500);
              }
          });

          database.query(`UPDATE statistics SET total_posts = total_posts + 1, last_post = NOW() WHERE account_id = ${request.session.user.id}`, (error, data) => {
            if (error) console.log(`Error updating post statistic for account: ${request.session.user.id}`);
          });
        });
      });
    });
    result.sendStatus(200);
  });
}
module.exports = { UploadPost }