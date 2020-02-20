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

// get all buildings //
route.get("/api/buildings/", async (req, res) => {
  try {
    const queryTemplate = `SELECT * FROM buildings`;
    const response = await pool.query(queryTemplate);
    res.json(response.rows);
  } catch (err) {
    res.status(500).json({
      message: "cannot get buildings",
      error: err.stack
    });
    console.error(err.stack);
  }
});

module.exports = {
  route
};
