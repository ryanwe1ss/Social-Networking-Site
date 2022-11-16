const { database } = require("./db_connect");

function Register(request, result)
{
  const credentials = request.body;
  database.query(`
    INSERT INTO accounts (username, password)
    VALUES ('${credentials.username}', '${credentials.password}')`,

    function(error, data) {
      if (!error) {
        result.send("success");
        console.log(`${credentials.username} has been registered`);
      }
      else if (error.detail.includes("exists")) result.send("exists");
      else result.send("error");
    }
  );
}
module.exports = { Register }