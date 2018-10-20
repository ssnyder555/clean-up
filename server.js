const express = require('express');
const app     = express();






// require our database
require('./db/db');



app.get('/', (req, res) => {
  res.send('This is my Clean-Up App')
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
