const sharp = require("sharp");
sharp.cache(false);

const fs = require("fs");
const formidable = require("formidable");
const { database } = require("../../database/db_connect");

function UpdateProfile(request, result) {
  const form = new formidable.IncomingForm();
  const account = request.body;

  if (Object.keys(account).length > 0) {
    for (const property in account) {
      account[property] = account[property].trim();
      account[property].length > 0
        ? account[property] = `'${account[property]}'`
        : account[property] = null;
    }

    database.query(`
      UPDATE accounts
      SET name=${account.name},
      gender=${account.gender},
      status=${account.status},
      birthdate=${account.birthdate},
      school=${account.school},
      major=${account.major},
      email=${account.email},
      phone_number=${account.phone_number},
      bio=${account.bio}
      WHERE id=${request.session.user.id}`,
      
      function (error, data) {
        if (!error) {
          result.send("success");
          console.log(`${request.session.user.username} has updated their profile`);

          database.query(`UPDATE statistics SET total_updates = total_updates + 1, last_update = NOW() WHERE account_id = ${request.session.user.id}`, (error, data) => {
            if (error) console.log(`Error updating last updated statistic for account: ${request.session.user.id}`);
          });
        }
      }
    );

  } else {
    form.on("file", function (field, file) {
      const image = `data/images/${request.session.user.id}_profile.png`;
      const thumbnail = `data/thumbnails/${request.session.user.id}_profile_thumbnail.png`;

      fs.renameSync(file.filepath, image, (error) => {
        if (error) {
          console.log(`Error Updating Picture for ${request.session.user.username}`);
          result.sendStatus(500);
          return;
        }
      });
      sharp(image)
      .resize(100, 100)
      .rotate()
      .toFile(thumbnail, (error) => {
        if (error) {
          console.log(`Error Updating Thumbnail for ${request.session.user.username}`);
          result.sendStatus(500);
          return;
        }
      });
        
      console.log(`${request.session.user.username} has updated their profile picture: ${file.originalFilename}`);
    });
    form.parse(request);
    result.sendStatus(200);
  }
}
module.exports = { UpdateProfile }