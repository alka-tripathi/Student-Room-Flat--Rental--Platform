const createTokens = require('../services/createTokens');

const token = createTokens(user);

res.cookie('access-token', token, {
  httpOnly: true,
  secure: false, // true in production
});

res.json({ success: true, token });
