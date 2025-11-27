const express = require('express')
const router = express.Router()

const LeadControllers = require("../controllers/mainControllers/LeadControllers")
const physioControllers = require("../controllers/maincontrollers/PhysioControllers")
const PatientControllers = require('../controllers/maincontrollers/PatientControllers')
const ExpenseControllers = require('../controllers/maincontrollers/ExpenseControllers')
const SessionControllers = require('../controllers/maincontrollers/SessionControllers')
const PetrolAllowanceControllers = require('../controllers/maincontrollers/PetrolAllowanceControllers')


//Leads
router.post("/Lead/createLead",LeadControllers.createLead)
router.post("/Lead/getAllLead",LeadControllers.getAllLeads)
router.post("/Lead/getSingleLead",LeadControllers.getLeadById)
router.post("/Lead/updateLead",LeadControllers.updateLead)
router.post("/Lead/deleteLead",LeadControllers.deleteLead)
router.post("/Lead/QualifyLead",LeadControllers.QualifyLead)

//Physio 
router.post("/Physio/createPhysio",physioControllers.createPhysio)
router.post("/Physio/getAllPhysio",physioControllers.getAllPhysios)
router.post("/Physio/getSinglePhysio",physioControllers.getPhysioById)
router.post("/Physio/updatePhysio",physioControllers.updatePhysio)
router.post("/Physio/deletePhysio",physioControllers.deletePhysio)
//physio login 

router.post("/Physio/loginPhysio",physioControllers.loginPhysio)
router.post('/Physio/logoutPhysio',physioControllers.logoutPhysio) 
router.post('/Physio/logoutUser',physioControllers.logoutUser) 
router.post('/Physio/checkLogin',physioControllers.checkLogin)

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


//SessionControllers
router.post('/Session/createSession',SessionControllers.createSession)
router.post('/Session/getAllSession',SessionControllers.getAllSession)
router.post('/Session/getSingleSession',SessionControllers.getSingleSession)
router.post('/Session/updateSession',SessionControllers.updateSession)
router.post('/Session/deleteSession',SessionControllers.deleteSession)

//Session Start and End

router.post('/Session/SessionStart',SessionControllers.SessionStart)
router.post('/Session/SessionEnd',SessionControllers.SessionEnd)
router.post('/Session/SessionCancel',SessionControllers.SessionCancel)

//PetrolAllowanceControllers

router.post('/PetrolAllowance/getAllPetrolAllowance',PetrolAllowanceControllers.getAllPetrol)



module.exports =router;