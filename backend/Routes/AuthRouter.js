const { signup, login } = require('../Controllers/AuthController');
const {
  signupValidation,
  loginValidation,
} = require('../Middleware/AuthValidation');

const router = require('express').Router();

//  Auth Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

router.post('/logout', (req, res) => {
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.env.FRONTEND_URL?.startsWith('https://');

  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });

  res.json({ success: true, message: 'Logged out' });
});

// Test route
router.get('/test', (req, res) => {
  res.send('Auth routes working');
});



module.exports = router;
