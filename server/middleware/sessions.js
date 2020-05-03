const uuidv4 = require("uuid/v4");

const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};
const pool = new Pool(config);

function getCookie(req, res, next) {

}
module.exports = {
    varifyToken
}