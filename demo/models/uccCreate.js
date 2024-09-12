const mongoose = require('mongoose');

const uccSchema = new mongoose.Schema({
  Ucc: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  otherField: String, // Add any other fields needed
});

module.exports = mongoose.model("UccCreate", uccSchema);
