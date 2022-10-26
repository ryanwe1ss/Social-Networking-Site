const database = require("mysql").createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "netconnect"
});
database.connect();
module.exports = { database: database };