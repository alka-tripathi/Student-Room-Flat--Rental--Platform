require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://rentalco-gwwb.onrender.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman)
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
