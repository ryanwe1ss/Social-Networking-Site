const { database } = require("../../database/db_connect");
const fs = require("fs");

function DeleteAccount(request, result)
{
  if (!fs.existsSync(`data/posts/${request.session.user.id}`)) return result.sendStatus(500);
  if (!fs.existsSync(`data/images/${request.session.user.id}_profile.png`)) return result.sendStatus(500);
  if (!fs.existsSync(`data/thumbnails/${request.session.user.id}_profile_thumbnail.png`)) return result.sendStatus(500);

  fs.rmdir(`data/posts/${request.session.user.id}`, { recursive: true }, (error) => {
    if (error) return result.sendStatus(500);

    fs.unlink(`data/images/${request.session.user.id}_profile.png`, (error) => {
      if (error) return result.sendStatus(500);

      fs.unlink(`data/thumbnails/${request.session.user.id}_profile_thumbnail.png`, (error) => {
        if (error) return result.sendStatus(500);

        database.query(`
          DELETE FROM accounts
          WHERE id = ${request.session.user.id}`,

          (error, results) => {
            if (error) return result.sendStatus(500);
            request.session.destroy();
            result.sendStatus(200);
          }
        );
      });
    });
  });
}
module.exports = { DeleteAccount }