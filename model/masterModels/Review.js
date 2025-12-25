const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
 patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  physioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Physio',
    },
 reviewDate:{
    type:Date
 },
 reviewTime:{
    type:String
 }, 
    reviewTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReviewType',
        required: true 
    },
  redFlags: [{
    redFlagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RedFlag' 
    }
  }],
    feedback: {
        type: String,
        required: true }
    
},{timestamps:true})
const ReviewModel = mongoose.model('Review',ReviewSchema)
module.exports=ReviewModel

   