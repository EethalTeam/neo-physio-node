const express = require('express')
const router = express.Router()

const LeadControllers = require("../controllers/maincontrollers/LeadControllers")
const physioControllers = require("../controllers/maincontrollers/PhysioControllers")


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

module.exports =router;