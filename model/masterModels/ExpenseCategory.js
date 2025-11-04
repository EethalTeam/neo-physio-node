const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    ExpenseCategoryName: {
        type: String,
        trim: true,
        required: true,
          unique:true
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
        unique:true
    },

    isActive: {
        type: Boolean,
        default: true
    }

})

const ExpenseModel = mongoose.model('Expense',ExpenseSchema)
module.exports=ExpenseModel



