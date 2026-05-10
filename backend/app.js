require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const RoomRouter = require('./Routes/RoomRoutes');

app.set('trust proxy', 1);

const { v2: cloudinary } = require('cloudinary');

// ✅ Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Allowed Origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://rental-co.onrender.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked origin:', origin);

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

// ✅ CORS MUST COME BEFORE ROUTES
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked origin:', origin);

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

// ✅ Middleware
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// ✅ Test Route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

// ✅ Routes
app.use('/auth', AuthRouter);
app.use('/room', RoomRouter);

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
