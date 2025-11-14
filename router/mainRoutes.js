const express = require('express')
const router = express.Router()

const LeadControllers = require("../controllers/maincontrollers/LeadControllers")
const physioControllers = require("../controllers/maincontrollers/PhysioControllers")
const PatientControllers = require('../controllers/maincontrollers/PatientControllers')
const ExpenseControllers = require('../controllers/maincontrollers/ExpenseControllers')


//Leads
router.post("/Lead/createLead",LeadControllers.createLead)
router.post("/Lead/getAllLead",LeadControllers.getAllLeads)
router.post("/Lead/getSingleLead",LeadControllers.getLeadById)
router.post("/Lead/updateLead",LeadControllers.updateLead)
router.post("/Lead/deleteLead",LeadControllers.deleteLead)  

//Physio 
router.post("/Physio/createPhysio",physioControllers.createPhysio)
router.post("/Physio/getAllPhysio",physioControllers.getAllPhysios)
router.post("/Physio/getSinglePhysio",physioControllers.getPhysioById)
router.post("/Physio/updatePhysio",physioControllers.updatePhysio)
router.post("/Physio/deletePhysio",physioControllers.deletePhysio)

//Patients
router.post("/Patient/createPatient",PatientControllers.createPatients)
router.post("/Patient/getAllPatient",PatientControllers.getAllPatients)
router.post("/Patient/getSinglePatient",PatientControllers.getByPatientsName)
router.post("/Patient/updatePatient",PatientControllers.updatePatients)
router.post("/Patient/deletePatient",PatientControllers.deletePatients)


//Assign Physio
router.post('/Patient/AssignPhysio',PatientControllers.AssignPhysio)

//ExpenseControllers
router.post('/Expense/createExpense',ExpenseControllers.createExpense)
router.post('/Expense/getAllExpense',ExpenseControllers.getAllExpense)
router.post('/Expense/getSingleExpense',ExpenseControllers.getSingleExpense)
router.post('/Expense/updateExpense',ExpenseControllers.updateExpense)
router.post('/Expense/deleteExpense',ExpenseControllers.deleteExpense)



module.exports =router;