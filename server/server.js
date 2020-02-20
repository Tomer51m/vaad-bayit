require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");

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

// get all users // -not needed anymore
app.get("/api/users/", async (req, res) => {
  try {
    const queryTemplate = `SELECT * FROM users`;
    const response = await pool.query(queryTemplate);
    res.json(response.rows);
  } catch (err) {
    res.status(500).json({
      message: "cannot get users",
      error: err.stack
    });
    console.error(err.stack);
  }
});

// get user by uid //
app.get("/api/users/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const queryTemplate =
      "SELECT * FROM users WHERE user_uid = $1";
    const response = await pool.query(queryTemplate, [uid]);

    if (response.rowCount === 0) {
      res.status(404).json({});
    } else {
      res.json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json({
      message: "cannot get user",
      error: err.stack
    });
    console.error(err.stack);
  }
});

// create user //
app.post("/api/users/", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password
  } = req.body;

  try {
    const uuid = uuidv4();
    const user_created = "2020-02-20 11:11:11.554346" // need to fix date //
    const queryTemplate =
      "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)";
    await pool.query(queryTemplate, [
      uuid,
      first_name,
      last_name,
      email,
      password,
      user_created
    ]);
    res.json({});
  } catch (err) {
      res.status(500).json({
        message: "cannot create user",
        error: err.stack
      });
    console.error(err.stack);
  }
});

// update user and return updated user//
app.put("/api/users/:uid", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
  } = req.body;

  const uid = req.params.uid;

  try {
    if (first_name) {
      const queryTemplate =
        "UPDATE users SET first_name = $1 WHERE user_uid = $2";
      await pool.query(queryTemplate, [first_name, uid]);
    }
    if (last_name) {
      const queryTemplate =
        "UPDATE users SET last_name = $1 WHERE user_uid = $2";
      await pool.query(queryTemplate, [last_name, uid]);
    }
    if (email) {
      const queryTemplate =
        "UPDATE users SET email = $1 WHERE user_uid = $2";
      await pool.query(queryTemplate, [email, uid]);
    }
    if (password) {
      const queryTemplate =
        "UPDATE users SET password = $1 WHERE user_uid = $2";
      await pool.query(queryTemplate, [password, uid]);
    }

    const queryTemplate = "SELECT * FROM users WHERE user_uid = $1";

    const response = await pool.query(queryTemplate, [uid]);
    let user = response.rows[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "cannot update user",
      error: err.stack
    });
    console.error(err.stack);
  }
});

// delete user //
app.delete("/api/users/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const queryTemplate = "DELETE FROM users WHERE user_uid = $1";
    await pool.query(queryTemplate, [uid]);
    res.json({
      message: "user deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "cannot delete user",
      error: err.stack
    });
    console.error(err.stack);
  }
});

// authentication ------

app.post("/api/signup", async (req, res) => {
  console.log("/api/signup", req.body)
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      PasswordConfirmation
    } = req.body;

    const uuid = uuidv4();

    function confirmPasswordsMatch(password, confirmPassword) {
      if (password === confirmPassword) {
        return true;
      } else {
        return false;
      }
    }

    async function hashPassword(password) {
      return await bcrypt.hash(password, 10);
    }
    /*
    const queryTemplate = "INSERT INTO users VALUES ($1, $2, $3, $4, $5)";
    await pool.query(queryTemplate, [
      uuid,
      first_name,
      last_name,
      email,
      pass
    ]);
    */

    res.json("registration information");
  } catch (err) {
    res.status(500).json({
      message: "cannot signup user",
      error: err.stack
    });
    console.log(err.stack);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const queryTemplate = "SELECT * FROM residents WHERE email = $1";
    await pool.query(queryTemplate, [email]);

    res.json("login token and user info");
  } catch (err) {
    res.status(500).json({
      message: "cannot login user",
      error: err.stack
    });
    console.log(err.stack);
  }
});
