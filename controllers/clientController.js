const mongoose = require('mongoose');
const express  = require('express');
const router   = express.Router();
const Client   = require('../models/client');
const Cleaners = require('../models/cleaner');
const Auth     = require('../models/auth');

// Find all Clients in Objects
router.get('/', async (req, res) => {
  try {

    const clientFound = await Client.find({});
    res.render('./client/index.ejs', {
      client: clientFound
    });
  } catch (err) {
    res.send(err);
  }
});

// Now for the post route: for Views/ client/clinetS.ejs
router.post('/clientS', (req, res) => {
  console.log(req.body);
  Client.find({
    // I think here I need to ask
    // "if they want clean service?"
    name: req.body.name
  }, (err, clientFound) => {
    res.render('./client/clientS.ejs', {
      client: clientFound
    });
  });
})

// Render New Form Page
router.get('/new', (req, res) => {
  res.render('./client/new.ejs');
});

// Create New Client from Info Passed from Function Above
router.get('/new',  async (req, res) => {
  try {
    const cleintCreated = await Client.create(req.body);
    console.log(clentCreated);
    const cell = await Cleaner.find({
      name: clientCreated.job
    });

    // loop into client data for jobs:
    for (let i = 0; i < cleaner.length; i++) {
      clenaer[i].client.push(clientCreated);
      cleaner[i].save((err, data) => {
        res.redirect('/client');
      });
    }
    console.log(cleaner);
  } catch (err) {
    res.send(err)
  }
});

//  Show each page for Client
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {

    const clientFound = await Client.findById(req.params.id);
    res.render('./client/show.ejs', {
      client: clientFound
    });
  } catch (err) {
    res.send(err)
  }
});

// Delete Cleaned Job
router.delete('/:id', async (req, res) => {
  try {
    await Client.findByIdAndRemove(req.params.id);
    res.redirect('/client');
  } catch (err) {
    res.send(err);
  }
});

// Render Edit Page
// has something to do with session
// you might need to pull it out
router.get('/:id/edit', async (req, res) => {

  if (req.session.logged === true) {
    try {
      const clientFound = await Client.findById(req.params.id);
      res.render('./client/edit.ejs', {
        client: clientFound
      })

    } catch (err) {
      res.send(err);
    }
  } else {
    req.session.message = 'You have logged into edit Cleaner/Client';
    res.redirect('/auth/login');
  }
});

// Change Edited Information
router.put('/:id', async (req, res) => {
  console.log(req.params.id, req.body);
try{
  await Client.findByIdAndUpdate(req.para,s.id, req.body);
  res.redirect('/client');

} catch (err) {
  res.send(err);
}
})

module.exports = router;
