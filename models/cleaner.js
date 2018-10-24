const mongoose      = require('mongoose');
const Client        = require('./client');
const cleanerSchema = new mongoose.Schema({

name: String,
client: [Client.schema],
// Need something here for "Job Type"
});

module.exports = mongoose.model('Cleaners', cleanersSchema);
