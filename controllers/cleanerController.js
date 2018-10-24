const mongoose = require('mongoose');
const express  = require('express');
const router   = express.Router();
const Cleaner  = require('../models/cleaner');
const Client   = require('../models/client');

// find all types cleaned objects
router.get('/', async (req, res) => {
  try {

    const cleanerFound = await Cleaner.find({});
    res.render('./cleaner/index.ejs', {
      cleaner: cleanerFound

    });
  } catch (err) {
    res.send(err);
  }
});
router.get('/update', async (req, res) => {
  try {
    // getting them to show up each others page
    const cleanerFound = await Cleaner.find({});
    const clientFound  = await Client.find({});
    // actually show up
    res.render('/cleaner/updateCleaner.ejs', {
      cleaner: cleanerFound,
      client:  clientFound
      // I dont understand the relationship yet
    });
  } catch (err) {
    res.send(err);
  }
});

// Render New Form page
router.get('/new', (req, res) => {
  res.render('./cleaner/new.ejs');
});

// Create new Clean Task from Info passed from Function Above
router.post('/', async (req, res) => {
  try {
    const cleanerCreated = await Cleaner.create(req.body);
    console.log(cleanerCreated);
    res.redirect('/cleaner');
  } catch (err) {
    res.send(err)
  }
});

// Show Each page for client
router.get('/:id', (req, res) => {
  Cleaner.findById(req.params.id, (err, foundCleaner) => {
    res.render('./cleaner/show.ejs', {
      cleaner: foundcleaner
    })
  });
});

// Delete Route: odd method
router.delete('/:id', (req, res) => {
  Cleaner.findByIdAndRemove(req.params.id, (err, deleteCleaner) => {
    res.redirect('/cleaner');
  });
});

// Render Edit Page
router.get('/:id/edit', async (req, res) => {
  try {
    const cleanerFound = await Cleaner.findById(req.params.id);
    res.render('./cleaner/edit.ejs', {
      cleaner: cleanerFound
    })
  } catch (err) {
    res.send(err);
  }
});

// Change Edited Information
router.put('/:id', async (req, res) => {
  console.log(req.params.id, req.body);
  try {

    await Cleaner.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/cleaner');
  } catch (err) {
    res.send(err);
  }
})

module.exports = router;
