const mongoose = require('mongoose')



// Define the Machinery Schema
const machineSchema = new mongoose.Schema({

    machineCode: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    machineName: {
        type: String,
        trim: true,
        required: true
    },
    machineCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineCategory',
        required: true
    },
    machineDescription: {
        type: String,
        trim: true,
    },
    Manufacturer: {
        type: String,
        trim: true,
        required: true
    },
    machineModel: {
        type: String,
        trim: true,
        required: true
    },
    TotalStockCount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    machineNote: {
        type: String,
        trim: true
    }


})
const Machine = mongoose.model('Machine', machineSchema)
module.exports = Machine