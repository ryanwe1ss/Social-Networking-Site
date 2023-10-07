require('../node_modules/dotenv').config({ path: "../../.env" });

const pgClient = require('../node_modules/pg');
const database = new pgClient.Client(
  `postgres://${process.env.REACT_APP_USER}:` +
  `${process.env.REACT_APP_PASSWORD}@` +
  `${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_DATABASE_PORT}/` +
  `${process.env.REACT_APP_DATABASE}`
);
database.connect();
module.exports = { database: database };