const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    ExpenseTypeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseType",
    },
    ExpenseCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseCategory",
    },
    expenseDate: {
      type: Date,
    },
    expenseAmount: {
      type: Number,
      trim: true,
    },
    PhysioId: {
      //after select PhysioSalary
      type: mongoose.Schema.Types.ObjectId,
      ref: "Physio",
      default: null,
    },
    physioDescription: {
      // after select EmployeeSalary and this description for Physio
      type: String,
      trim: true,
    },
    officeExpDes: {
      //after select Office Expense and this Description
      type: String,
      trim: true,
    },
    ReferenceId: {
      //after select Reference Commision and this field Reference Name
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reference",
      default: null,
    },
    PatientId: {
      //after select Reference Commision and this field Patient Name
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },
    referenceDes: {
      //after select Reference Commision and this field Description
      type: String,
      trim: true,
    },
    MachineiId: {
      // after select Machine Maintances and this field Machine
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      default: null,
    },
    machineDes: {
      // after select Machine Maintances and this field Machine Description
      type: String,
      trim: true,
    },
    otherDescription: {
      // after select other Expenses and this field other Expenses Description
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
module.exports = ExpenseModel;
