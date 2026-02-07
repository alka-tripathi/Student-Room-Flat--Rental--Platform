//setting up the server
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log('Server is listening to port');
});
