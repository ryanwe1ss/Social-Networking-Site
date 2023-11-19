const { database } = require("../../../database/database");

function UpdateProfile(request, result) {
  const account = request.body;
  
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
        database.query(`UPDATE statistics SET total_updates = total_updates + 1, last_update = NOW() WHERE account_id = ${request.session.user.id}`, (error, data) => null);
      
      } result.sendStatus(error ? 500 : 200);
    }
  );
}
module.exports = { UpdateProfile }