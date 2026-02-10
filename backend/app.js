//setting up the server
const express = require('express');
const app = express();
const verifyToken = require('./middleware/verifyToken');
const dashboardRoutes = require('./routes/dashboard');

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log('Server is listening to port');
});

// /user/dashboard

app.use('/user', dashboardRoutes);
