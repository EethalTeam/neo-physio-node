const mongoose = require('mongoose');

// Define the Reference Schema
const ReferenceSchema = new mongoose.Schema({

    sourceCode: {
        type: String,
        trim: true,
   
    },
    sourceName: {
        type: String,
        required: true,
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

const Reference = mongoose.model('Reference',ReferenceSchema )
module.exports = Reference
