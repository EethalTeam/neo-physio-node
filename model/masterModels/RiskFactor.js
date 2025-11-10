const mongoose = require('mongoose')

const RiskFactorSchema = new mongoose.Schema({
  RiskFactorName:{
    type:String,
    trim:true
  },
    RiskFactorCode:{
    type:String,
    trim:true
  },
  isActive:{
       type: Boolean,
      default: true
  }
})
const RiskFactorModel = mongoose.model('RiskFactor',RiskFactorSchema)
module.exports=RiskFactorModel