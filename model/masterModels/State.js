const mongoose = require('mongoose');

// Define the State Schema
const StateSchema = new mongoose.Schema(
  {
    StateCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    StateName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    CountryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
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

// Create the State Model
const State = mongoose.model('State', StateSchema);

module.exports = State;
