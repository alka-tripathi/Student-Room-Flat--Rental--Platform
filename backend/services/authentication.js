const JWT = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET || '$alka';

function createTokens(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role, // optional: student / owner / admin
  };

  const token = JWT.sign(payload, secret, {
    expiresIn: '7d', // token valid for 7 days
  });

  return token;
}

module.exports = createTokens;
