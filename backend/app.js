require('dotenv').config(); // 🔥 must be first

const express = require('express');
const app = express();
const cors = require('cors');

const AuthRouter = require('./Routes/AuthRouter');
const RoomRouter = require('./Routes/RoomRoutes');
require('./Models/db');

const { v2: cloudinary } = require('cloudinary');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ CORS setup
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

// Routes
app.use('/auth', AuthRouter);
app.use('/room', RoomRouter);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
