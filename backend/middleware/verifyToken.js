const JWT = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET || "$alka";

function verifyToken(req, res, next) {
  try {
    // token from cookies OR headers
    const token =
      req.cookies["access-token"] ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No Token." });
    }

    const verified = JWT.verify(token, secret);

    // attach user data in request
    req.user = verified;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = verifyToken;
