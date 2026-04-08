const userModel = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: 'User is already found ,you can login',
        success: false,
      });
    }

    //new data is stored here

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: 'Sigup successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMsg = 'Auth failed email or password is wrong';
    const user = await userModel.findOne({ email });
    if (!user) {
      //user nai hai
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    //new data is stored here
    const isPassword = await bcrypt.compare(password, user.password); //user.password database se aa rha hai
    if (!isPassword) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const jwtTokens = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.status(200).json({
      message: 'Login successfully',
      success: true,
      _id: user._id, // 🔥 ADD THIS
      jwtTokens,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};
module.exports = {
  signup,
  login,
};
