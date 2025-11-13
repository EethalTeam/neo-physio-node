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
    commissionCategory:{
        type:String,
        trim:true
    },
    commissionType:{
        type:String,
        trim:true
    },
    CommissionPercentage:{
          type:Number,
          trim:true
    },
     commissionAmount:{
          type:Number,
          trim:true
    },
  
},{timestamps:true})

const Reference = mongoose.model('Reference',ReferenceSchema )
module.exports = Reference
