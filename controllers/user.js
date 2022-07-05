const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const knex = require("../services/db");
const { authenticate } = require("../middlewares/auth");
const { generateToken } = require("../helpers/generateToken");

exports.signup = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const inputPassword = req.body.password;

    const saltRounds = parseInt(process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(inputPassword, saltRounds);
    const returnId = await knex
      .insert(
        [
          {
            username: `${req.body.username}`,
            password: hashedPassword,
          },
        ],
        ["id"]
      )
      .into("users");
    res.json({ returnId });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errMsg: err.toString(),
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // console.log(`req.body`, req.body);
    const inputPassword = req.body.password;
    // const saltRounds = parseInt(process.env.SALTROUNDS);
    // const hashedPassword = await bcrypt.hash(inputPassword, saltRounds);
    const users = await knex("users").where({
      username: `${req.body.username}`,
    });
    // .select("password");
    // console.log(`the user:`, users, inputPassword);

    // Load hash from your password DB.
    if (bcrypt.compareSync(inputPassword, users[0].password)) {
      const token = await generateToken(req.body.username);
      if (!token) {
        res.status(500).json({ error: " Not able to generate token" });
      } else {
        res.json({ token: token });
      }
    } else {
      console.log("credentials do not match");
      res.status(403).json({ error: "Credentials dont match" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.toString() });
  }
};

exports.signout = async (req, res) => {
  try {
    res.json({ message: "Signout Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errMsg: err.toString(),
    });
  }
};

exports.faster = async (req, res) => {
  try {
    console.log(`req body`, req.body);
    const newTime = req.body.fastest;
    const user = req.user; // pass down from authenticate middleware
    console.log(
      `something`,
      newTime,
      user.fastest,
      typeof newTime,
      typeof user.fastest
    );
    if (newTime < user.fastest || user.fastest === 0) {
      await knex("users")
        .where({ username: user.username })
        .update({ fastestTime: newTime });
    }
    res.json({ message: "fastestTime updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errMsg: err.toString(),
    });
  }
};
