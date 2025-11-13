const mongoose = require('mongoose')



// define Gender Schema
const genderSchema = new mongoose.Schema({
    
    genderCode:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    genderName:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }


},{timestamps:true})
const genderModel = mongoose.model('Gender',genderSchema)
module.exports=genderModel