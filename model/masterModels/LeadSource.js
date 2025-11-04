const mongoose = require('mongoose')



// define Gender Schema
const leadSchema = new mongoose.Schema({
    
    leadSourceCode:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    leadSourceName:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }


})
const LeadModel = mongoose.model('LeadSource',leadSchema)
module.exports=LeadModel;