const app = require("./app");
const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};
const pool = new Pool(config);

async function initializeDB() {
  await pool.connect();
  await new Promise((resolve, reject) =>
    app.listen(8080, (err) => (err ? reject(err) : resolve()))
  );
  console.log("server on port 8080, connected to database");
}

initializeDB().catch((err) => console.error(err));