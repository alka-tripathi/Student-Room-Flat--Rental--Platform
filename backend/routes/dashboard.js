const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // ✅ missing line

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome User' });
});

module.exports = router; // ✅ also required
