const { database } = require("./db_connect");

function UpdateProfile(request, result)
{
  const account = request.body;
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
    WHERE id=${account.id}`, function(error, response) {
      if (!error) { result.send("success") } else console.log(error);
    }
  );
}
module.exports = { UpdateProfile }