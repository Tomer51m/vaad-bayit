const { Router } = require("express");
const route = Router();
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUserSchema } = require("../schemas/createUser.schema.js");

const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};
const pool = new Pool(config);

// create new user // + create building for user //
route.post("/api/auth/signup", async (req, res) => {
  try {
    await createUserSchema.validate(req.body, { abortEarly: false }); // need to refactor as middleware //

    const {
      firstName: first_name,
      lastName: last_name,
      email,
      password
    } = req.body;

    const uuid = uuidv4();
    const user_created = "2020-02-20 11:11:11.554346"; // need to fix date //
    const passwordHash = await bcrypt.hash(password, 4);
    const queryTemplate = "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)";
    await pool.query(queryTemplate, [
      uuid,
      first_name,
      last_name,
      email,
      passwordHash,
      user_created
    ]);

    const querycreatedUser = "SELECT * FROM users WHERE user_id = $1";
    const response = await pool.query(querycreatedUser, [uuid]);

    res.json(response.rows);
  } catch (err) {
    res.status(500).json({
      message: "cannot create user",
      error: err.stack
    });
    console.error(err);
  }
});

// login user //
route.get("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const queryTemplate = "SELECT * FROM users WHERE email = $1";
    const response = await pool.query(queryTemplate, [email]);
    console.log("response", response);
    const user = response.rows[0];
    console.log("user", user);
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const Token = jwt.sign({ uid: user.user_id }, process.env.TOKEN_SECRET);
      res.header("Authorization", `Bearer ${Token}`).json(user);
    } else {
      res.json("password incorrect");
    }
  } catch (err) {
    res.status(500).json({
      message: "cannot login user",
      error: err.stack
    });
    console.log(err.stack);
  }
});

module.exports = {
  route
};
