const mongoose = require('mongoose')

const physioSChema = new mongoose.Schema({

    physioCode: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    physioName: {
        type: String,
        trim: true,
        require: true,
    },
    physioContactNo: {
        type: true,
        trim: true,
        require: true,
    },
    physioSpcl: {
        type: true,
        trim: true,
        require: true,
    },

    physioQulifi: {
        type: true,
        trim: true,
        require: true,
    },

    physioExp: {
        type: true,
        trim: true,
        require: true,
    },
    physioPan: {
        type: true,
        trim: true,
        require: true,
    },
    physioAadhar: {
        type: true,
        trim: true,
        require: true,
    },
    physioSalary: {
        type: Number,
        require: true,
        trim: true
    },
    physioProbation: {
        type: Number,
        require: true,
        trim: true
    },
    physioINCR: {
        type: Date,
        require: true
    },
    physioPetrolAlw: {
        type: Number,
        require: true,
        trim: true
    },
    physioVehicleMTC: {
        type: Number,
        require: true,
        trim: true
    },
    physioIncentive: {
        type: Number,
        require: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    physioNote:{
        type:String,
        trim:true
    },
    physioDescription:{
        type:String,
        trim:true
    }



})

const physioModel = mongoose.model('Physio', physioSChema)
module.exports = physioModel