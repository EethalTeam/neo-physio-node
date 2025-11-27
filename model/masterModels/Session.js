const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionCode: {
    type: String,
    required: true,
    unique: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  physioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Physio',
    required: true
  },
  sessionDate: {
    type: Date,
    required: true
  },
  sessionDay: {
    type: String, 
    required: true
},
  sessionTime: {
    type: String,
    required: true
  },
  sessionFromTime: {
    type: String
  },
  sessionToTime: {
    type: String
  },
  machineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    default: false
  },
  sessionStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SessionStatus', 
    default: null
  },
  sessionFeedbackPros: {
    type: String,
    trim: true
  },
  sessionFeedbackCons: {
    type: String,
    trim: true
  },
  modeOfExercise: {
    type: String,
    trim: true
  },
  // Red Flags Array
  redFlags: [{
    redFlagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RedFlag' 
    },
    isOccurred: {
      type: Boolean,
      default: false
    }
  }],
  homeExerciseAssigned: {
    type: Boolean,
    default: false
  },
  modalities: {
    type: Boolean,
    default: false
  },
  modalitiesList: [{
    modalityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Modalitie' 
    },
    isOccurred: {
      type: Boolean,
      default: false
    }
  }],
  targetArea: {
    type: String,
    trim: true
  },
  media:{
     type: String,
  }
}, {
  timestamps: true
});


const SessionModel =  mongoose.model('Session', sessionSchema);
module.exports = SessionModel