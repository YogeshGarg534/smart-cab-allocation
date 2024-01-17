const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,

  },
  isCabEmpty: Boolean
});

module.exports = mongoose.model('Cab', cabSchema);