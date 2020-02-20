require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();

const usersRoutes = require("./routes/users.routes");
const buildingsRoutes = require("./routes/buildings.routes");
const authRoutes = require("./routes/auth.routes");

app.set("port", 8080);
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};
const pool = new Pool(config);

async function initialize() {
  await pool.connect();
  await new Promise((resolve, reject) =>
    app.listen(app.get("port"), err => (err ? reject(err) : resolve()))
  );
  console.log("server is up, connected to database");
}
initialize().catch(err => console.error(err));

// routes
app.use(usersRoutes.route);
app.use(buildingsRoutes.route);
app.use(authRoutes.route)
