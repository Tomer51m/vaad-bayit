require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const app = express();

const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};
const pool = new Pool(config);


const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const buildingsRoutes = require("./routes/buildings.routes");
const apartmentsRoutes = require("./routes/apartments.routes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { secure: false, httpOnly: true, maxAge:60000 },
  })
);

// routes
app.use(authRoutes.route);
app.use(usersRoutes.route);
app.use(buildingsRoutes.route);
app.use(apartmentsRoutes.route);

module.exports = app