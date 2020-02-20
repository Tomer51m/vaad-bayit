const { Router } = require("express");
const route = Router();

// authentication //
route.post("/api/signup", async (req, res) => {
  console.log("/api/signup", req.body);
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

route.post("/api/login", async (req, res) => {
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

module.exports = {
    route
  };
  
