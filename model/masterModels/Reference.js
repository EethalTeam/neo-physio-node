const mongoose = require('mongoose');

// Define the Reference Schema
const RedflagSchema = new mongoose.Schema({

    sourceCode: {
        type: String,
        require: true,
        trime: true,
        unique: true
    },
    sourceName: {
        type: String,
        require: true,
        trim: true
    },
    IsperPatient: {
        type: Boolean,
        default: false,
    },
    IsperSession:{
         type: Boolean,
         default: false
    },
    Ispercentage:{
        type: Boolean,
        default: false
    },
    Isrupees:{
       type: Boolean,
       default: false
    },
    CommissionPercentage:{
          type:Number,
          trim:true
    },
     commissionAmount:{
          type:Number,
          trim:true
    },
  
})

const Reference = mongoose.model('Reference',RedflagSchema )
module.exports = Reference
