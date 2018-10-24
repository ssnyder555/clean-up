
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const methodOverride = require('method-override');
const session       = require('express-session');

// require our database
require('./db/db');

// require our middle-ware
const cleanerContollers = require('./controllers/cleanerController');
const clientControllers = require('./controllers/clientController');
// If I get to Auth Controllers
const authControllers   = require('./controllers/authController');

// session has to do with: being loged in for duration of time
app.use(session ({
  secret: 'This is some random string',
  resave: false,
  saveUnitialized: false
}));

// This is where I apply my controllers:
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use('/cleaner', cleanerContollers);
app.use('/client', clientControllers);
app.use('/auth', authControllers);


app.get('/', (req, res) => {
  res.send('This is my Clean-Up App')
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
