const express = require('express')
const router = express.Router()

const MachineCategoryControllers = require('../controllers/mastercontrollers/MachineCategoryControllers')
const MachineControllers = require('../controllers/mastercontrollers/MachineControllers')
const CityControllers = require('../controllers/mastercontrollers/CityControllers')
const CountryControllers = require('../controllers/mastercontrollers/CountryControllers')
const RedflagControllers = require('../controllers/mastercontrollers/RedflagControllers')
const StateControllers = require('../controllers/mastercontrollers/StateControllers')
const MenuControllers = require('../controllers/mastercontrollers/MenuControllers')
const ReferencesControllers = require('../controllers/mastercontrollers/ReferenceControllers')
const ExpenseCategoryControllers = require('../controllers/mastercontrollers/ExpenseCategoryControllers')
const PhysioCategoryControllers = require('../controllers/mastercontrollers/PhysioCategoryControllers')
const LeadSourceControllers = require('../controllers/mastercontrollers/LeadSourceControllers')
const GenderControllers = require('../controllers/mastercontrollers/GenderControllers')




//Machinery Category Routes
router.post("/MachineCategory/createMachineCategory",MachineCategoryControllers.createMachineCate)
router.post("/MachineCategory/getAllMachineCategory",MachineCategoryControllers.getAllMachCate)
router.post("/MachineCategory/getSingleMachineCategory",MachineCategoryControllers.getMachCateByName)
router.post("/MachineCategory/updateMachineCategory",MachineCategoryControllers.updateMachCate)
router.post("/MachineCategory/deleteMachineCategory",MachineCategoryControllers.deleteMachCate)

//Machinery Routes
router.post("/Machinery/createMachinery",MachineControllers.createMachine)
router.post("/Machinery/getAllMachinery",MachineControllers.getAllMachine)
router.post("/Machinery/getSingleMachinery",MachineControllers.getMachineByName)
router.post("/Machinery/updateMachinery",MachineControllers.updateMaachine)
router.post("/Machinery/deleteMachinery",MachineControllers.deleteMachine)

//CityControllers 
router.post("/City/createCity",CityControllers.createCity)
router.post("/City/getAllCity",CityControllers.getAllCitys)
router.post("/City/getSingleCity",CityControllers.getCityByName)
router.post("/City/updateCity",CityControllers.updateCity)
router.post("/City/deleteCity",CityControllers.deleteCity)


//StateControllers
router.post("/State/createState",StateControllers.createState)
router.post("/State/getAllState",StateControllers.getAllStates)
router.post("/State/getSingleState",StateControllers.getStateByName)
router.post("/State/updateState",StateControllers.updateState)
router.post("/State/deleteState",StateControllers.deleteState)


//CountryControllers
router.post("/Country/createCountry",CountryControllers.createCountry)
router.post("/Country/getAllCountry",CountryControllers.getAllCountry)
router.post("/Country/getSingleCountry",CountryControllers.getCountryByName)
router.post("/Country/updateCountry",CountryControllers.updateCountry)
router.post("/Country/deleteCountry",CountryControllers.deleteCountry)


//RedflagControllers
router.post("/Redflag/createRedflag",RedflagControllers.createRedflag)
router.post("/Redflag/getAllRedflag",RedflagControllers.getAllRedflag)
router.post("/Redflag/getSingleRedflag",RedflagControllers.getRedflagByName)
router.post("/Redflag/updateRedflag",RedflagControllers.updateRedflag)
router.post("/Redflag/deleteRedflag",RedflagControllers.deleteRedflag)

//MenuControllers
 router.post('/Menu/createMenu', MenuControllers.createMenu)
//  router.post('/Menu/insertManyMenus', MenuControllers.InsertMany)
router.post('/Menu/updateMenu', MenuControllers.updateMenu)
router.post('/Menu/getAllMenus', MenuControllers.getAllMenus)
router.post('/Menu/getAllParentsMenu', MenuControllers.getAllParentsMenu)
router.post('/Menu/getFormattedMenu', MenuControllers.getFormattedMenu)


//ReferencesControllers
router.post("/References/createReferences",ReferencesControllers.createReference)
router.post("/References/getALlReferences",ReferencesControllers.getAllReference)
router.post("/References/getSingleReferences",ReferencesControllers.getSingleReference)
router.post("/References/updateReferences",ReferencesControllers.updateReferences)
router.post("/References/deleteReferences",ReferencesControllers.deleteReferences)


//ExpenseCategoryControllers 
router.post("/ExpenseCategory/createExpenseCategory",ExpenseCategoryControllers.createExpense)
router.post("/ExpenseCategory/getAllExpenseCategory",ExpenseCategoryControllers.getAllExpenses)
router.post("/ExpenseCategory/getSingleExpenseCategory",ExpenseCategoryControllers.getExpenseCategoryByName)
router.post("/ExpenseCategory/updateExpenseCategory",ExpenseCategoryControllers.updateExpense)
router.post("/ExpenseCategory/deleteExpenseCategory",ExpenseCategoryControllers.deleteExpense)


//PhysioCategoryControllers
router.post("/PhysioCategory/createPhysioCategory",PhysioCategoryControllers.createPhysioCategory)
router.post("/PhysioCategory/getAllPhysioCategory",PhysioCategoryControllers.getAllPhysioCategory)
router.post("/PhysioCategory/getSinglePhysioCategory",PhysioCategoryControllers.getPhysioCategoryByName)
router.post("/PhysioCategory/updatePhysioCategory",PhysioCategoryControllers.updatephysioCategory)
router.post("/PhysioCategory/deletePhysioCategory",PhysioCategoryControllers.deletePhysioCategory)

//LeadSourceControllers
router.post("/LeadSource/createLeadSource",LeadSourceControllers.createLeadSource)
router.post("/LeadSource/getAllLeadSource",LeadSourceControllers.getAllLeadSource)
router.post("/LeadSource/getSingleLeadSource",LeadSourceControllers.getLeadsourceByName)
router.post("/LeadSource/updateLeadSource",LeadSourceControllers.updateLeadSource)
router.post("/LeadSource/deleteLeadSource",LeadSourceControllers.deleteLeadSource)


//GenderControllers
router.post("/Gender/createGender",GenderControllers.createGender)
router.post("/Gender/getAllGender",GenderControllers.getAllGender)
router.post("/Gender/getSingleGender",GenderControllers.getGenderByName)
router.post("/Gender/updateGender",GenderControllers.updateGender)
router.post("/Gender/deleteGender",GenderControllers.deleteGender)




module.exports =router