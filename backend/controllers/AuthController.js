const userModel = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    const user = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (user) {
      return res.status(409).json({
        message: 'User already exists, please login',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Signup successful',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(403).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    // JWT TOKEN
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    //  STORE TOKEN IN COOKIE
    // Vercel and the API are different sites, so the browser needs a secure
    // cross-site cookie in production. Do not depend only on NODE_ENV because
    // some hosting providers do not set it automatically.
    const isProduction =
      process.env.NODE_ENV === 'production' ||
      process.env.FRONTEND_URL?.startsWith('https://');

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

   
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
