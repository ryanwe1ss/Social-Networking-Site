const sharp = require("sharp");
sharp.cache(false);

const fs = require("fs");
const formidable = require("formidable");
const { database } = require("./db_connect");

function UpdateProfile(request, result) {
  const form = new formidable.IncomingForm();
  const account = request.body;

  if (Object.keys(account).length != 0) {
    database.query(`
      UPDATE accounts
      SET name=COALESCE('${account.name}', name),
      gender=COALESCE('${account.gender}', gender),
      status=COALESCE('${account.status}', status),
      birthdate=COALESCE('${account.birthdate}', birthdate),
      school=COALESCE('${account.school}', school),
      concentration=COALESCE('${account.concentration}', concentration),
      email=COALESCE('${account.email}', email),
      phone_number=COALESCE('${account.phone_number}', phone_number),
      bio=COALESCE('${account.bio}', bio)
      WHERE id=${account.id}`, function (error, response) {
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
      .toFile(thumbnail, (error) => console.log(error));
        
      console.log(`${request.session.user.username} has updated their profile picture: ${file.originalFilename}`);
    });
    form.parse(request);
    result.send("success");
  }
}
module.exports = { UpdateProfile }