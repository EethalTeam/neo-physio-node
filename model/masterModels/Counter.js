const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // We will store 'sessionCode' here
  seq: { type: Number, default: 0 }
});


const CouterModel =mongoose.model('Counter', counterSchema);
module.exports = CouterModel