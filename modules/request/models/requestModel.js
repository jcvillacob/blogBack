const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    method: String,
    url: String,
    headers: Object,
    body: String,
    timestamp: Date,
  });

module.exports = mongoose.model('Request', requestSchema);