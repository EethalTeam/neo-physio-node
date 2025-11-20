const mongoose = require('mongoose')



// define  Modalities Schema
const ModalitiesSchema = new mongoose.Schema({
    
    modalitiesCode:{
        type:String,
        trim:true,
     
    },
    modalitiesName:{
        type:String,
        trim:true,
      
    },
   
    isActive:{
        type:Boolean,
        default:true
    }


},{timestamps:true})
const ModalitiesModel = mongoose.model('Modalities',ModalitiesSchema)
module.exports=ModalitiesModel;