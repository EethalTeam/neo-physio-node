const express = require('express')
const router = express.Router()

const LeadControllers = require('../controllers/mainControllers/LeadControllers')
const physioControllers = require('../controllers/mainControllers/PhysioControllers')
const PatientControllers = require('../controllers/mainControllers/PatientControllers')
const ExpenseControllers = require('../controllers/mainControllers/ExpenseControllers')
const SessionControllers = require('../controllers/mainControllers/SessionControllers')
const PetrolAllowanceControllers = require('../controllers/mainControllers/PetrolAllowanceControllers')
const DashBoardControllers = require('../controllers/mainControllers/DashBoardControllers')

const ReviewControllers = require('../controllers/mainControllers/ReviewControllers')
const ConsultationControllers = require('../controllers/mainControllers/ConsultationControllers');




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

//DashBoardControllers
router.post('/DashBoard/getAllDashBoard',DashBoardControllers.getAllDashBoard)

//ConsultationControllers
router.post('/Consultation/createConsultation',ConsultationControllers.createConsultation)
router.post('/Consultation/getAllConsultation',ConsultationControllers.getAllConsultation)
router.post('/Consultation/getSingleConsultation',ConsultationControllers.getByConsultationName)
router.post('/Consultation/updateConsultation',ConsultationControllers.updateConsultation)
router.post('/Consultation/deleteConsultation',ConsultationControllers.deleteConsultation)


//ReviewControllers
router.post('/Review/createReview',ReviewControllers.createReview)
router.post('/Review/getAllReview',ReviewControllers.getAllReview)
router.post('/Review/getSingleReview',ReviewControllers.getReviewById)
router.post('/Review/updateReview',ReviewControllers.updateReview)
router.post('/Review/deleteReview',ReviewControllers.deleteReview)



module.exports =router;