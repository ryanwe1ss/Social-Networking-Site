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
      if (!error) result.send("success");
    }
    );

  } else {
    form.on("file", function (field, file) {
      filePath = `images/${request.query.id}_profile.png`;
      fs.renameSync(file.filepath, filePath, (error) => null)
      console.log(`${request.query.username} has changed their profile picture: ${file.originalFilename}`)
    });
    form.parse(request);
    result.send("success");
  }
}
module.exports = { UpdateProfile }