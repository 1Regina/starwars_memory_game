const jwt = require("jsonwebtoken");
const knex = require("../services/db");

// next as the call back
exports.authenticate = async (req, res, next) => {
  try {
    const reqToken = req.header("Authorization");
    console.log("reqToken", reqToken);
    const privateKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(reqToken, privateKey);
    console.log(`the decoded username is`, decoded.username);
    const users = await knex("users").where("username", decoded.username);
    req.user = {
      username: users[0].username,
      fastest: users[0].fastestTime,
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      errMsg: err.toString(),
    });
  }
};
