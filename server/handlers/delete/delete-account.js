const { database } = require("../../database/db_connect");
const fs = require("fs");

function DeleteAccount(request, result)
{
  fs.rmdir(`data/posts/${request.session.user.id}`, { recursive: true }, (error) => {
    if (error) return result.sendStatus(500);

    fs.unlink(`data/images/${request.session.user.id}_profile.png`, (error) => null);
    fs.unlink(`data/thumbnails/${request.session.user.id}_profile_thumbnail.png`, (error) => null);

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
}
module.exports = { DeleteAccount }