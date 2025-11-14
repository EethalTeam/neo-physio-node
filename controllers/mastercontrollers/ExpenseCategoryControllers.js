const mongoose = require('mongoose')
const Expense = require('../../model/masterModels/ExpenseCategory')

//Create Expense 

exports.createExpenseCategory = async (req,res) =>{
     
    try {
        const {
        ExpenseCategoryName,ExpenseCategoryType,ExpenseCategoryCode,isActive } = req.body

     const existingExpense = await Expense.findOne({
        $or :[
            {ExpenseCategoryCode},
            {ExpenseCategoryName}, 
            
        ]
     })
      if (existingExpense) {
            return res.status(400).json({ message: 'ExpenseCategory with this code or name already exists' });
        }

         const Expenses = new Expense({
          ExpenseCategoryName,ExpenseCategoryType,ExpenseCategoryCode,isActive
         })
         await Expenses.save()
          res.status(200).json({message:"ExpenseCategory create successfully", data:Expenses._id})

    } catch (error) {
            res.status(500).json({ message: error.message });
    }

}


//get all Expense 

exports.getAllExpensesCategory = async (req,res)=>{
       try {
           const expensesType = await Expense.find()
           res.status(200).json(expensesType)
           if(!expensesType){
            return res.status(400).json({message:'Expenses is not find'})
           }
       } catch (error) {
        res.status(500).json({ message: error.message });
       }
}



// Get a single ExpenseCategory  by Name
exports.getExpenseCategoryByName = async (req, res) => {
    try {
        
        const Expenses = await Expense.findOne({ ExpenseCategoryName: req.body.ExpenseCategoryName })
    
        if (!Expenses) {
            return res.status(400).json({ message: 'Expenses not found' });
        }

        res.status(200).json(Expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update ExpenseCategory

exports.updateExpenseCategory= async (req,res) => {
    try {
       
               const { _id,ExpenseCategoryName,ExpenseCategoryType,ExpenseCategoryCode,isActive } = req.body

        const Expenses = await Expense.findByIdAndUpdate(
        _id,
        {$set:{ExpenseCategoryName,ExpenseCategoryType,ExpenseCategoryCode,isActive}},
        {new:true, runValidators:true}
    )
    
        if (!Expenses) {
            return res.status(400).json({ message: 'Expense not found' });
        }

        res.status(200).json({message:"Expense update successfully",data:Expenses})


    } catch (error) {
           res.status(500).json({ message: error.message });
    }
}



// Delete a Category
exports.deleteExpenseCategory= async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const Expenses = await Expense.findByIdAndDelete(_id);

        if (!Expenses) {
            return res.status(400).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};