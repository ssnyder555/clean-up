const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
const Auth     = require('../models/auth');
const bcrypt   = require('bcrypt');

router.get('/login', (req, res) => {

  // On every single route in the whole entire application
  // you have attached to req a new property called session
  res.render('./auth/login.ejs', {
    message: req.session.message
  });
});

router.post('/register', async (req, res) => {

  // first thing we store is the "password" variable
  const password = req.body.password;
  // Create our Hash
  const passwordHash = bycrpt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(passwordHash)

  // Create an Object to put into our
  // database into the "User Model"
  const userEntry    = {};
  userEntry.username = req.body.username;
  userEntry.password = passwordHash;

  const user = await Auth.create(userEntry);
  console.log(user);
  // initializing the session here
  // req.session.username = req.body.username
  req.session.logged  = true;
  req.session.message = '';
  res.redirect('/client');
});

router.post('/login', async (req, res) => {

  // First Query the DataBase to see if the user Exists
  try {
    const foundUser = await Auth.findOne({
      username: req.body.username
    });
    console.log(foundUser)

    if (foundUser) {hu

// if the user exists use the bcrypt compare password
// to make sure the password match
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.logged = true;

      res.redirect('/client')
    } else {
      req.session.message = 'Username or Password is Wrong';
      res.redirect('/auth/login')
    }
  } else {
    req.session.message = 'Username or Password is Wrong';
    res.redirect('/auth/login')
  } // end of found User
} catch (err) {
  res.send('error')
}
});

router.get('/logout', (req, res) => {
  // This basically restarts the session
  // and clears out all the properties that we set
  // on the session object
  req.session.destroy((err) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/auth/login')
    }
  });
});

module.exports = router; 
