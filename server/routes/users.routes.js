const { Router } = require("express");
const route = Router();

const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};
const pool = new Pool(config);

// get all users // -not needed anymore
route.get("/api/users/", async (req, res) => {
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

// get user by id //
route.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryTemplate = "SELECT * FROM users WHERE user_id = $1";
    const response = await pool.query(queryTemplate, [id]);

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
route.post("/api/users/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const uuid = uuidv4();
    const user_created = "2020-02-20 11:11:11.554346"; // need to fix date //
    const queryTemplate = "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)";
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
route.put("/api/users/:id", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const id = req.params.id;

  try {
    if (first_name) {
      const queryTemplate =
        "UPDATE users SET first_name = $1 WHERE user_id = $2";
      await pool.query(queryTemplate, [first_name, id]);
    }
    if (last_name) {
      const queryTemplate =
        "UPDATE users SET last_name = $1 WHERE user_id = $2";
      await pool.query(queryTemplate, [last_name, id]);
    }
    if (email) {
      const queryTemplate = "UPDATE users SET email = $1 WHERE user_id = $2";
      await pool.query(queryTemplate, [email, id]);
    }
    if (password) {
      const queryTemplate =
        "UPDATE users SET password = $1 WHERE user_id = $2";
      await pool.query(queryTemplate, [password, id]);
    }

    const queryTemplate = "SELECT * FROM users WHERE user_id = $1";

    const response = await pool.query(queryTemplate, [id]);
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
route.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryTemplate = "DELETE FROM users WHERE user_id = $1";
    await pool.query(queryTemplate, [id]);
    res.json({
      message: "user deleted"
    });
  } catch (err) {
    res.status(500).json({
      message: "cannot delete user",
      error: err.stack
    });
    console.error(err.stack);
  }
});

module.exports = {
  route
};
