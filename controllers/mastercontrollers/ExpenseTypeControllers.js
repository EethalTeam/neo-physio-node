const mongoose = require('mongoose')
const ExpenseType = require('../../model/masterModels/ExpenseType')

//Create Expense Type

exports.createExpenseType = async (req,res) =>{
     
    try {
        const {
        ExpenseTypeName,ExpenseTypeCode,isActive } = req.body

     const existingExpenseType = await ExpenseType.findOne({
        $or :[
            {ExpenseTypeCode},
            {ExpenseTypeName}, 
            
        ]
     })
      if (existingExpenseType) {
            return res.status(400).json({ message: 'ExpenseType with this code or name already exists' });
        }

         const expensesType = new ExpenseType({
          ExpenseTypeName,ExpenseTypeCode,isActive
         })
         await expensesType.save()
          res.status(200).json({message:"ExpenseType successfully", data:expensesType})

    } catch (error) {
            res.status(500).json({ message: error.message });
    }

}


//get all ExpenseType 

exports.getAllExpensesType = async (req,res)=>{
       try {
           const expensesType = await ExpenseType.find()
           res.status(200).json(expensesType)
           if(!expensesType){
            return res.status(400).json({message:'ExpensesType is not find'})
           }
       } catch (error) {
        res.status(500).json({ message: error.message });
       }
}



// Get a single ExpenseType  by Name
exports.getExpenseTypeByName = async (req, res) => {
    try {
        
        const expensesType = await ExpenseType.findOne({ ExpenseTypeName: req.body.ExpenseTypeName })
    
        if (!expensesType) {
            return res.status(400).json({ message: 'ExpensesType not found' });
        }

        res.status(200).json(expensesType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update ExpenseType

exports.updateExpenseType= async (req,res) => {
    try {
       
               const { _id,ExpenseTypeName,ExpenseTypeCode,isActive } = req.body

        const expensesType = await ExpenseType.findByIdAndUpdate(
        _id,
        {$set:{ExpenseTypeName, ExpenseTypeCode,isActive}},
        {new:true, runValidators:true}
    )
    
        if (!expensesType) {
            return res.status(400).json({ message: 'Type not found' });
        }

        res.status(200).json({message:"Expense update successfully",data:expensesType})


    } catch (error) {
           res.status(500).json({ message: error.message });
    }
}



// Delete a expensesType
exports.deleteExpenseType= async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const expensesType = await ExpenseType.findByIdAndDelete(_id);

        if (!expensesType) {
            return res.status(400).json({ message: 'ExpenseType not found' });
        }

        res.status(200).json({ message: 'ExpenseType deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};