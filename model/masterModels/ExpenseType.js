const mongoose = require('mongoose')

const ExpenseTypeSchema = new mongoose.Schema({
    ExpenseTypeName: {
        type: String,
        trim: true,
        required: true,
           
    },
    ExpenseTypeCode: {
        type: String,
        trim: true,
        required: true,
     
    },

    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps:true})

const ExpenseTypeModel = mongoose.model('ExpenseType',ExpenseTypeSchema)
module.exports=ExpenseTypeModel



