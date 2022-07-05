const express = require("express");
const router = express.Router();
const User = require("../controllers/user");
const { authenticate } = require("../middlewares/auth");
const knex = require("../services/db");

router.get("/healthcheck", (req, res) => {
  res.send("OK");
});

router.post("/signup", User.signup);

// router.post('/login', async (req, res) => {
//   res.send('OK')
// })
router.post("/signin", User.signin);

// router.get('/logout', async (req, res) => {
//   const users = await knex('users')
//   res.json(users)
// })
router.get("/signout", User.signout);

router.get("/verify", authenticate, (req, res) => {
  res.json(req.user);
});

router.put("/faster", authenticate, User.faster);

module.exports = router;
