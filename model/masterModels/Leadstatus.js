const mongoose = require('mongoose')



// define LeadStatus Schema
const LeadStatusSchema = new mongoose.Schema({
    
    leadStatusCode:{
        type:String,
        trim:true,
     
    },
    leadStatusName:{
        type:String,
        trim:true,
      
    },
    isActive:{
        type:Boolean,
        default:true
    }


},{timestamps:true})
const LeadStatusModel = mongoose.model('LeadStatus',LeadStatusSchema)
module.exports=LeadStatusModel;