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

// create new user + create building for user + assign building to user//
route.post("/api/auth/signup", async (req, res) => {
  try {
    console.log("request body", req.body)
    await createUserSchema.validate(req.body, { abortEarly: false }); // need to refactor as middleware //

    const {
      firstName: first_name,
      lastName: last_name,
      email,
      password,
      city,
      street,
      number
    } = req.body;

    const user_uuid = uuidv4();
    const user_created = "2020-02-20 11:11:11.554346"; // need to fix date //
    const passwordHash = await bcrypt.hash(password, 4);
    const querynewUser = "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)";
    await pool.query(querynewUser, [
      user_uuid,
      first_name,
      last_name,
      email,
      passwordHash,
      user_created
    ]);
    
    const building_uuid = uuidv4();
    const building_created = "2020-02-20 11:11:11.554346"; // need to fix date //
    const queryNewBuilding = "INSERT INTO buildings VALUES ($1, $2, $3, $4, $5)";
    await pool.query(queryNewBuilding, [building_uuid, building_created, city, street, number]);
    
    const bu_created = "2020-02-20 11:11:11.554346"; // need to fix date //
    const queryNewBU = "INSERT INTO buildings_users VALUES ($1, $2, $3)";
    await pool.query(queryNewBU, [building_uuid, user_uuid, bu_created]);

    const querycreatedUser = "SELECT * FROM users WHERE user_id = $1";
    const newUser = await pool.query(querycreatedUser, [user_uuid]);

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "signup failed",
      error: "can't signup user"
    });
  }
});

// login user //
route.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const queryTemplate = "SELECT * FROM users WHERE email = $1";
    const response = await pool.query(queryTemplate, [email]);
    const user = response.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const Token = jwt.sign({ uid: user.user_id }, process.env.TOKEN_SECRET);
      res.header("Authorization", `Bearer ${Token}`).json(user);
    } else {
      res.status(401).json({
        message: "Login failed",
        error: "Email or password incorrect"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Login failed",
      error: "Email or password incorrect"
    });
  }
});

module.exports = {
  route
};
