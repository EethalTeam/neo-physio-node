const mongoose = require('mongoose')



// define MachineryCategory Schema
const machineCategory = new mongoose.Schema({
    
    categoryCode:{
        type:String,
        trim:true,
        unique:true,
        require:true
    },
    categoryName:{
        type:String,
        trim:true,
        unique:true,
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    }


})
const machineCategorymodel = mongoose.model('MachineCategory',machineCategory)
module.exports=machineCategorymodel