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
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const errorMsg = 'Invalid email or password';

//     const user = await userModel.findOne({
//       email: email.toLowerCase(),
//     });

//     if (!user) {
//       return res.status(403).json({
//         message: errorMsg,
//         success: false,
//       });
//     }

//     const isPassword = await bcrypt.compare(password, user.password);

//     if (!isPassword) {
//       return res.status(403).json({
//         message: errorMsg,
//         success: false,
//       });
//     }

//     if (!process.env.JWT_SECRET) {
//       throw new Error('JWT_SECRET not defined');
//     }

//     const jwtTokens = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '24h',
//     });

//     // ✅ ADD THIS PART 👇
//     const jwtTokens = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '24h',
//     });

//     res.status(200).json({
//       message: 'Login successful',
//       success: true,
//       jwtTokens, // ✅ send token to frontend
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });

//     // ✅ RESPONSE
//     res.status(200).json({
//       message: 'Login successful',
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//       // ❌ no need to send jwtTokens now (optional)
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Internal server error',
//       success: false,
//     });
//   }
// };

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ COOKIE (FINAL)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // 🔥 MUST for Render (HTTPS)
      sameSite: 'None', // 🔥 MUST for cross-origin
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
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
