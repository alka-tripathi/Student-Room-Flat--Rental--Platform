// require('dotenv').config(); // 🔥 must be first

// const express = require('express');
// const app = express();
// const cors = require('cors');

// const cookieParser = require('cookie-parser');

// app.use(cookieParser());

// const AuthRouter = require('./Routes/AuthRouter');
// const RoomRouter = require('./Routes/RoomRoutes');
// require('./Models/db');
// app.set('trust proxy', 1);

// const { v2: cloudinary } = require('cloudinary');

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ✅ CORS setup
// const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

// app.use(
//   cors({
//     origin: 'https://rentalco-gwwb.onrender.com', // ✅ your frontend
//     credentials: true,
//   }),
// );

// // Middleware
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Test route
// app.get('/ping', (req, res) => {
//   res.send('Pong');
// });

// // Routes
// app.use('/auth', AuthRouter);
// app.use('/room', RoomRouter);

// // Server start
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const AuthRouter = require('./Routes/AuthRouter');
const RoomRouter = require('./Routes/RoomRoutes');

require('./Models/db');

app.set('trust proxy', 1);

const { v2: cloudinary } = require('cloudinary');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ CORS
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   }),
// );
// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'https://rentalco-gwwb.onrender.com'],
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174', // 🔥 ADD THIS
        'https://rentalco-gwwb.onrender.com',
      ];

      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked origin:', origin); // 🔥 DEBUG
      return callback(null, false);
    },
    credentials: true,
  }),
);
// Middleware
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', AuthRouter);
app.use('/room', RoomRouter);

app.get('/ping', (req, res) => {
  res.send('Pong');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
