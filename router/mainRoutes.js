const express = require('express')
const router = express.Router()

const LeadControllers = require("../controllers/maincontrollers/LeadControllers")


//Leads
router.post("/Lead/createLead",LeadControllers.createLead)
router.post("/Lead/getAllLead",LeadControllers.getAllLeads)
router.post("/Lead/getSingleLead",LeadControllers.getLeadById)
router.post("/Lead/updateLead",LeadControllers.updateLead)
router.post("/Lead/deleteLead",LeadControllers.deleteLead)  

module.exports =router;