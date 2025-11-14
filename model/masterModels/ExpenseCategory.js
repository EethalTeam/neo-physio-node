const mongoose = require('mongoose')

const ExpenseCategorySchema = new mongoose.Schema({
    ExpenseCategoryName: {
        type: String,
        trim: true,
        required: true,
         
    },
    ExpenseCategoryType: {
        type: String,
        trim: true,
        required: true
    },
    ExpenseCategoryCode: {
        type: String,
        trim: true,
        required: true,
     
    },

    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps:true})

const ExpenseCategoryModel = mongoose.model('ExpenseCategory',ExpenseCategorySchema)
module.exports=ExpenseCategoryModel



