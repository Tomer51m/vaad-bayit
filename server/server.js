require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();

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

app.get("/api/users/", async (req, res) => {
  try {
    const queryTemplate = `SELECT 
        id,
        first_name,
        last_name, 
        apartment_number,
        floor_number,
        is_owner
        FROM users`;
    const response = await pool.query(queryTemplate);
    res.json(response.rows);
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryTempalate =
      "SELECT first_name, last_name FROM users WHERE id = $1";
    const response = await pool.query(queryTempalate, [id]);

    if (response.rowCount === 0) {
      res.status(404).json({});
    } else {
      res.json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});

app.post("/api/users/:id", async (req, res) => {
  const { first_name, last_name } = req.body;
  const id = req.params.id;

  try {
    const queryTempalate = "INSERT INTO users VALUES ($1, $2, $3)";
    await pool.query(queryTempalate, [id, first_name, last_name]);
    res.json({});
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});

app.put("/api/users/:id", async (req, res) => {
  const {
    first_name,
    last_name,
    apartment_number,
    floor_number,
    is_owner
  } = req.body;
  const id = req.params.id;
  try {
    if (first_name) {
      const queryTempalate = "UPDATE users SET first_name = $1 WHERE id = $2";
      await pool.query(queryTempalate, [first_name, id]);
    }
    if (last_name) {
      const queryTempalate = "UPDATE users SET last_name = $1 WHERE id = $2";
      await pool.query(queryTempalate, [last_name, id]);
    }
    if (apartment_number) {
      const queryTempalate =
        "UPDATE users SET apartment_number = $1 WHERE id = $2";
      await pool.query(queryTempalate, [apartment_number, id]);
    }
    if (floor_number) {
      const queryTempalate = "UPDATE users SET floor_number = $1 WHERE id = $2";
      await pool.query(queryTempalate, [floor_number, id]);
    }
    if (is_owner === true || is_owner === false) {
      const queryTempalate = "UPDATE users SET is_owner = $1 WHERE id = $2";
      await pool.query(queryTempalate, [is_owner, id]);
    }

    res.json({});
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryTempalate = "DELETE FROM users WHERE id = $1";
    await pool.query(queryTempalate, [id]);
    res.json({});
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});
