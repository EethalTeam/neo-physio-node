const mongoose = require('mongoose')



// define ReviewStatus Schema
const ReviewStatusSchema = new mongoose.Schema({
    
    reviewStatusCode:{
        type:String,
        trim:true,
     
    },
    reviewStatusName:{
        type:String,
        trim:true,
      
    },
 
      isActive:{
        type:Boolean,
        default:true
    }


},{timestamps:true})
const ReviewStatusModel = mongoose.model('ReviewStatus',ReviewStatusSchema)
module.exports=ReviewStatusModel;