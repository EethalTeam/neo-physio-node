const mongoose = require("mongoose");
const Expense = require("../../model/masterModels/Expense");

// Create a new Expense
exports.createExpense = async (req, res) => {
  try {
    const {
      ExpenseTypeID,
      ExpenseCategoryId,
      expenseDate,
      expenseAmount,
      PhysioId,
      physioDescription,
      officeExpDes,
      ReferenceId,
      PatientId,
      referenceDes,
      MachineiId,
      machineDes,
      otherDescription,
    } = req.body;

    // Create and save the Expense
    const expenses = new Expense({
      ExpenseTypeID,
      ExpenseCategoryId,
      expenseDate,
      expenseAmount,
      PhysioId,
      physioDescription,
      officeExpDes,
      ReferenceId,
      PatientId,
      referenceDes,
      MachineiId,
      machineDes,
      otherDescription,
    });
    await expenses.save();

    res.status(200).json({
      message: "Expense created successfully",
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Expense
exports.getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("ExpenseTypeID", "ExpenseTypeName")
      .populate("ExpenseCategoryId", "ExpenseCategoryName")
      .populate("PhysioId", "physioName")
      .populate("ReferenceId", "sourceName")
      .populate("PatientId", "patientName")
      .populate("MachineiId", "machineName");
    if (!expenses) {
      res.status(400).json({ message: "Expense is not found" });
    }

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Expense by id
exports.getSingleExpense = async (req, res) => {
  try {
    const expenses = await Expense.findOne({ _id: req.body });

    if (!expenses) {
      return res.status(400).json({ message: "Expense not found" });
    }

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Expense
exports.updateExpense = async (req, res) => {
  try {
    const {
      _id,
      ExpenseTypeID,
      ExpenseCategoryId,
      expenseDate,
      expenseAmount,
      PhysioId,
      physioDescription,
      officeExpDes,
      ReferenceId,
      PatientId,
      referenceDes,
      MachineiId,
      machineDes,
      otherDescription,
    } = req.body;

    const expenses = await Expense.findByIdAndUpdate(
      _id,
      {
        $set: {
          ExpenseTypeID,
          ExpenseCategoryId,
          expenseDate,
          expenseAmount,
          PhysioId,
          physioDescription,
          officeExpDes,
          ReferenceId,
          PatientId,
          referenceDes,
          MachineiId,
          machineDes,
          otherDescription,
        },
      },
      { new: true, runValidators: true },
    );

    if (!expenses) {
      return res.status(400).json({ message: "Expense Cant able to update" });
    }

    res
      .status(200)
      .json({ message: "Expense updated successfully", data: expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Expense
exports.deleteExpense = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const expenses = await Expense.findByIdAndDelete(_id);

    if (!expenses) {
      return res.status(400).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
