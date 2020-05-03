require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const app = express();

const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const buildingsRoutes = require("./routes/buildings.routes");
const apartmentsRoutes = require("./routes/apartments.routes");

const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const pool = new Pool(config);

async function initialize() {
  await pool.connect();
  await new Promise((resolve, reject) =>
    app.listen(8080, (err) => (err ? reject(err) : resolve()))
  );
  console.log("server is up, connected to database");
}

initialize().catch((err) => console.error(err));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false },
  })
);

// routes
app.use(authRoutes.route);
app.use(usersRoutes.route);
app.use(buildingsRoutes.route);
app.use(apartmentsRoutes.route);
