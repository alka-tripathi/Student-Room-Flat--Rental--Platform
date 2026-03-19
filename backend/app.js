//setting up the server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
require('dotenv').config();
require('./Models/db');
const RoomRouter = require('./Routes/RoomRoutes');
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.get('/ping', (req, res) => {
  res.send('Pong');
});

app.use(bodyParser.json());
app.use(cors()); //server is open to any frontend port

app.use('/auth', AuthRouter); //ye staring mai hoga route

app.use('/product', AuthRouter);

//add the images and details from the owner
app.use('/room', RoomRouter);

app.listen(PORT, (req, res) => {
  console.log('Server is listening to port');
});
