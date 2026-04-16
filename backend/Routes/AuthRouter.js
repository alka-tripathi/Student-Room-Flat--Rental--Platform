const { signup, login } = require('../controllers/AuthController');
const {
  signupValidation,
  loginValidation,
} = require('../middleware/AuthValidation');

const router = require('express').Router();

// 🔐 Auth Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

// 🧪 Test route (optional)
router.get('/test', (req, res) => {
  res.send('Auth routes working');
});

module.exports = router;
