const jwt = require("jsonwebtoken");

exports.generateToken = async (username) => {
  try {
    const privateKey = process.env.JWT_SECRET;
    const token = await jwt.sign({ username: username }, privateKey, {
      algorithm: "HS256",
    });
    return token;
  } catch (err) {
    console.log("error type", typeof err);
    console.log("error", err);
    return null
  }
};
