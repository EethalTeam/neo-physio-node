const mongoose = require('mongoose')



// define SessionStatus Schema
const SessionStatusSchema = new mongoose.Schema({
    
    sessionStatusCode:{
        type:String,
        trim:true,
     
    },
    sessionStatusName:{
        type:String,
        trim:true,
      
    },
    sessionStatusColor:{
        type:String,
    },
    sessionStatusTextColor:{
              type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    }


},{timestamps:true})
const SessionStatusModel = mongoose.model('SessionStatus',SessionStatusSchema)
module.exports=SessionStatusModel;