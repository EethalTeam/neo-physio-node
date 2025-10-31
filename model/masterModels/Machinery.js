const mongoose = require('mongoose')
 


// Define the Machinery Schema
const machineSchema = new mongoose.Schema({

    machineCode: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    machineName: {
        type: String,
        trime: true,
        require: true
    },
    machineCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineCategory',
        required: true
    },
    Description:{
        type:String,
        trim:true, 
    },
    Manufacturer:{
        type:String,
        trim:true,
        require:true
    },
    Model:{
        type:String,
        trim:true,
        require:true
    },
    TotalStockCount:{
        type:Number,
        require:true
    },
    isActive:{
       type:Boolean,
       default:true
    }


})
const Machine = mongoose.model('Machine', machineSchema)
module.exports = Machine