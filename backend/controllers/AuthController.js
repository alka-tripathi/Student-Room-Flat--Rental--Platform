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
    const errorMsg = 'Invalid email or password';

    const user = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }

    const jwtTokens = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // ✅ ADD THIS PART 👇
    res.cookie('token', jwtTokens, {
      httpOnly: true,
      secure: true, // required for Render (HTTPS)
      sameSite: 'None', // required for cross-origin
    });

    // ✅ RESPONSE
    res.status(200).json({
      message: 'Login successful',
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      // ❌ no need to send jwtTokens now (optional)
    });
  } catch (error) {
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
