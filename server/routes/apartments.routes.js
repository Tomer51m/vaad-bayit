const { Router } = require("express");
const route = Router();
const uuidv4 = require("uuid/v4");

const { Pool } = require("pg");
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};
const pool = new Pool(config);

// get all apartments //
route.get("/api/apartments/", async (req, res) => {
  try {
    const queryTemplate = `SELECT * FROM apartments`;
    const response = await pool.query(queryTemplate);
    res.json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "get apartments failed",
      error: "cannot fetch apartments"
    });
  }
});

// get all apartments of building by building_id //
route.get("/api/apartments/:id", async (req, res) => {
  const buildingId = req.params.id;
  try {
    const queryTemplate =
      "SELECT apartments.* FROM apartments, buildings_users WHERE buildings_users.building_id = buildings.building_id AND user_id = $1";
    const response = await pool.query(queryTemplate, [id]);
    console.log(response);
    if (response.rowCount === 0) {
      res.status(404).json({});
    } else {
      res.json(response.rows);
    }
  } catch (err) {
    res.status(500).json({
      message: "cannot get buildings for user",
      error: err.stack
    });
    console.error(err.stack);
  }
});

// create building by user id//
route.post("/api/buildings/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { city, street, building_number } = req.body;

  try {
    const building_id = uuidv4();
    const building_created = "2020-02-20 11:11:11.554346"; // need to fix date //
    const queryTemplate = "INSERT INTO buildings VALUES ($1, $2, $3, $4, $5)";
    await pool.query(queryTemplate, [
      building_id,
      building_created,
      city,
      street,
      building_number
    ]);

    const createConnection = "INSERT INTO buildings_users VALUES ($1, $2, $3)";
    await pool.query(createConnection, [
      building_id,
      user_id,
      building_created
    ]);

    const queryNewBuilding = "SELECT * FROM buildings WHERE building_id = $1";
    const newBuilding = await pool.query(queryNewBuilding, [building_id]);
    res.json(newBuilding.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: "cannot create building",
      error: err.stack
    });
    console.error(err.stack);
  }
});

// update building and return updated building//
route.put("/api/buildings/:building_id", async (req, res) => {
  const building_id = req.params.building_id;
  const { city, street, building_number } = req.body;
  try {
    if (city) {
      const queryTemplate =
        "UPDATE buildings SET city = $1 WHERE building_id = $2";
      await pool.query(queryTemplate, [city, building_id]);
    }
    if (street) {
      const queryTemplate =
        "UPDATE buildings SET street = $1 WHERE building_id = $2";
      await pool.query(queryTemplate, [street, building_id]);
    }
    if (building_number) {
      const queryTemplate =
        "UPDATE users SET building_number = $1 WHERE building_id = $2";
      await pool.query(queryTemplate, [building_number, building_id]);
    }

    const queryTemplate = "SELECT * FROM buildings WHERE building_id = $1";
    const response = await pool.query(queryTemplate, [building_id]);

    res.json(response.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: "cannot update building",
      error: err.stack
    });
    console.error(err.stack);
  }
});

// delete building // what about the line in table buildings_users ? should I delete it as well? or cascade (delete) is the solution?
route.delete("/api/building/:building_id", async (req, res) => {
  const building_id = req.params.building_id;
  try {
    const queryTemplate = "DELETE FROM users WHERE building_id = $1";
    await pool.query(queryTemplate, [building_id]);
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
