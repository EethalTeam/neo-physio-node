const mongoose = require("mongoose");

// define Leave Schema
const LeaveSchema = new mongoose.Schema(
  {
    physioId: {
      type: String,
      trim: true,
      ref: "Physio",
    },
    LeaveDate: {
      type: Date,
    },
    LeaveMode: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const LeaveModel = mongoose.model("Leave", LeaveSchema);
module.exports = LeaveModel;
