const mongoose = require('mongoose')

const FeesTypeSchema = new mongoose.Schema({
    feesTypeName: {
        type: String,
        trim: true,
        required: true,
           
    },
    feesTypeCode: {
        type: String,
        trim: true,
        required: true,
     
    },

    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps:true})

const FessTypeTypeModel = mongoose.model('FeesType',FeesTypeSchema)
module.exports=FessTypeTypeModel



