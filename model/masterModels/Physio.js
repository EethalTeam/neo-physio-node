const mongoose = require('mongoose');

const physioSChema = new mongoose.Schema({
    physioCode: {
        type: String,
        trim: true,
    },
    physioName: {
        type: String,
        trim: true,
        required: true,
    },
    physioGenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender'
    },
    physioContactNo: {
        type: String,
        trim: true,
        required: true,
    },
    physioSpcl: { 
        type: String,
        trim: true,
        required: true,
    },
    physioQulifi: {
        type: String,
        trim: true,
        required: true,
    },
    physioExp: {
        type: String,
        trim: true,
        required: true,
    },
    physioPAN: {
        type: String,
        trim: true,
        required: true,
    },
    physioAadhar: {
        type: String,
        trim: true,
        required: true,
    },
    physioSalary: {
        type: Number,
        required: true,
        trim: true
    },
    physioProbation: {
        type: Number,
        required: true,
        trim: true
    },
    physioINCRDate: {
        type: Date,
        required: true
    },
    physioPetrolAlw: {
        type: Number,
        required: true,
        trim: true
    },
    physioVehicleMTC: {
        type: Number,
        required: true,
        trim: true
    },
    physioIncentive: {
        type: Number,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    physioNote: {
        type: String,
        trim: true
    },
    physioDescription: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Physio = mongoose.model('Physio', physioSChema);
module.exports = Physio;