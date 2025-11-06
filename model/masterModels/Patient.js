const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    patientCode: {
        type: String,
        trim: true,

    },
    patientName: {
        type: String,
        trim: true,

    },
    consultationDate: {
        type: Date,

    },
    patientAge: {
        type: Number,
        trim: true,

    },
    patientGenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender'

    },
    byStandar: {
        type: String,
        trim: true,

    },
    Relation: {
        type: String,
        trim: true

    },
    patientNumber: {
        type: Number,
        trim: true
    },
    patientAltNum: {
        type: Number,
        trim: true

    },
    patientAddress: {
        type: String,
        trim: true

    },
    patientPinCode: {
        type: String,
        trim: true

    },
    patientCondition: {
        type: String,
        trim: true,

    },
    physioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Physio',

    },
    reviewDate: {
        type: Date,

    },
    isDiabetic: {
        type: Boolean,
        default: false
    },
    isTrauma: {
        type: Boolean,
        default: false
    },
    isHistoryofSurgery: {
        type: Boolean,
        default: false
    },
    isHistoryofFall: {
        type: Boolean,
        default: false
    },
    isHypertension: {
        type: Boolean,
        default: false
    },
    isOsteoporosis: {
        type: Boolean,
        default: false
    },
    isArthritis: {
        type: Boolean,
        default: false
    },
    otherMedCon: {
        type: String,
        trim: true,

    },
    currMed: {
        type: String,
        trim: true,

    },
    typesOfLifeStyle: {
        type: String,
        trim: true,

    },
    smokingOrAlcohol: {
        type: Boolean,
        default: false
    },
    dietaryHabits: {
        type: String,
        trim: true

    },
    Contraindications: {
        type: String,
        trim: true

    },
    painLevel: {
        type: Number,

    },

    rangeOfMotion: {
        type: String,
        trim: true

    },

    muscleStrength: {
        type: String,
        trim: true

    },
    postureOrGaitAnalysis: {
        type: String,
        trim: true

    },
    functionalLimitations: {
        type: String,
        trim: true
    },
    ADLAbility: {
        type: String,
        trim: true
    },
    shortTermGoals: {
        type: String,
        trim: true
    },
    longTermGoals: {
        type: String,
        trim: true
    },
    RecomTherapy: {
        type: String,
        trim: true
    },
    Frequency: {
        type: Number,
        trim: true
    },
    Duration: {
        type: String,
        trim: true
    },
    noOfDays: {
        type: Number,

    },
    Modalities: {
        type: Boolean,
        default: false
    },
    targetedArea: {
        type: String,
        trim: true
    },
    hodNotes: {
        type: String,
        trim: true
    }


})
const PatientModel = mongoose.model('Patient', patientSchema)
module.exports = PatientModel