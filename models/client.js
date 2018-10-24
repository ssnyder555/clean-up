const mongoose      = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Job: String,
});

module.exports = mongoose.model('Client', clientSchema);
