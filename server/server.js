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
        res_id,
        first_name,
        last_name, 
        apartment_number,
        floor_number,
        is_owner
        FROM residents`;
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
    const queryTemplate =
      "SELECT first_name, last_name FROM users WHERE res_id = $1";
    const response = await pool.query(queryTemplate, [id]);

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

app.post("/api/users/", async (req, res) => {
  const {
    first_name,
    last_name,
    apartment_number,
    floor_number,
    is_owner
  } = req.body;

  try {
    const queryTemplate =
      "INSERT INTO residents VALUES (uuid_generate_v4() ,$1, $2, $3, $4, $5)";
    await pool.query(queryTemplate, [
      first_name,
      last_name,
      apartment_number,
      floor_number,
      is_owner
    ]);
    res.json({});
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});

app.put("/api/users/", async (req, res) => {
  const {
    first_name,
    last_name,
    apartment_number,
    floor_number,
    is_owner,
    res_id
  } = req.body;

  try {
    if (first_name) {
      const queryTemplate =
        "UPDATE residents SET first_name = $1 WHERE res_id = $2";
      await pool.query(queryTemplate, [first_name, res_id]);
    }
    if (last_name) {
      const queryTemplate =
        "UPDATE residents SET last_name = $1 WHERE res_id = $2";
      await pool.query(queryTemplate, [last_name, res_id]);
    }
    if (apartment_number) {
      const queryTemplate =
        "UPDATE residents SET apartment_number = $1 WHERE res_id = $2";
      await pool.query(queryTemplate, [apartment_number, res_id]);
    }
    if (floor_number) {
      const queryTemplate =
        "UPDATE residents SET floor_number = $1 WHERE res_id = $2";
      await pool.query(queryTemplate, [floor_number, res_id]);
    }
    if (is_owner === true || is_owner === false) {
      const queryTemplate =
        "UPDATE residents SET is_owner = $1 WHERE res_id = $2";
      await pool.query(queryTemplate, [is_owner, res_id]);
    }

    const queryTemplate = "SELECT * FROM residents WHERE res_id = $1";;

    const response = await pool.query(queryTemplate, [res_id]);
    res.json(response.rows);
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});

app.delete("/api/users/", async (req, res) => {
  const id = req.body.res_id;
  try {
    const queryTemplate = "DELETE FROM residents WHERE res_id = $1";
    await pool.query(queryTemplate, [id]);
    res.json({});
  } catch (err) {
    res.status(500).json(err.stack);
    console.error(err.stack);
  }
});
