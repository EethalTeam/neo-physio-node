const mongoose = require('mongoose');

// Define the Redflag Schema
const RedflagSchema = new mongoose.Schema(
  {
    redflagName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    redflagCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true
  }
);

// Create the Redflag Model
const Redflag = mongoose.model('RedFlag', RedflagSchema);

module.exports = Redflag;
