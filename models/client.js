const mongoose     = require('mongoose');

const cleintSchema = new mongoose.Schema({
  title: String,
  body:  String
});

module.exports = mongoose.model('Client', clientSchema);
