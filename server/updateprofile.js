const { database } = require("./db_connect");

function UpdateProfile(request, result)
{
  const account = request.body;
  database.query(`
    UPDATE accounts
    SET username=IF('${account.username}'='', username, '${account.username}'),
    gender=IF('${account.gender}'='', gender, '${account.gender}'),
    status=IF('${account.status}'='', status, '${account.status}'),
    birthday=IF('${account.birthday}'='', birthday, '${account.birthday}'),
    school=IF('${account.school}'='', school, '${account.school}'),
    concentration=IF('${account.concentration}'='', concentration, '${account.concentration}'),
    email=IF('${account.email}'='', email, '${account.email}'),
    phone_number=IF('${account.phone}'='', phone_number, '${account.phone}'),
    bio=IF('${account.bio}'='', bio, '${account.bio}')
    WHERE id=${account.id}`, function(error, data) {
      if (!error) { result.send("success") } else console.log(error);
  });
}
module.exports = { UpdateProfile }