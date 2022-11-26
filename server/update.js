const sharp = require("sharp");
sharp.cache(false);

const fs = require("fs");
const formidable = require("formidable");
const { database } = require("./db_connect");

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
      concentration=${account.concentration},
      email=${account.email},
      phone_number=${account.phone_number},
      bio=${account.bio}
      WHERE id=${account.id}`,
      
      function (error, data) {
        if (!error) {
          result.send("success");
          console.log(`ID (${request.query.id}) has updated their profile`);
        }
      }
    );

  } else {
    form.on("file", function (field, file) {
      const image = `images/${request.query.id}_profile.png`;
      const thumbnail = `images/thumbnails/${request.query.id}_profile_thumbnail.png`;

      fs.renameSync(file.filepath, image, (error) => null);
      sharp(image)
      .resize(100, 100)
      .toFile(thumbnail, (error) => null);
        
      console.log(`${request.session.user.username} has updated their profile picture: ${file.originalFilename}`);
    });
    form.parse(request);
    result.send("success");
  }
}
module.exports = { UpdateProfile }