const mongoose = require('mongoose');
const Patient = require('../../model/masterModels/Patient')

// Create a new Patient
exports.createPatients = async (req, res) => {
    try {
        const { patientName, patientCode, isActive ,consultationDate ,historyOfFall,historyOfSurgery,historyOfSurgeryDetails,historyOfFallDetails,
             patientAge ,patientGenderId ,byStandar ,Relation,patientNumber,patientAltNum ,patientAddress ,patientPinCode,patientCondition,physioId,
             reviewDate,MedicalHistoryAndRiskFactor,otherMedCon,currMed,typesOfLifeStyle,smokingOrAlcohol,dietaryHabits,Contraindications
             ,painLevel,rangeOfMotion,muscleStrength,postureOrGaitAnalysis,functionalLimitations,ADLAbility,shortTermGoals,
             longTermGoals,RecomTherapy,Frequency,Duration,noOfDays,Modalities,targetedArea,hodNotes,Physiotherapist,sessionStartDate,sessionTime,
             totalSessionDays,InitialShorttermGoal,goalDuration,visitOrder,KmsfromHub,KmsfLPatienttoHub,Feedback,Satisfaction,kmsFromPrevious,reviewFrequency
            } = req.body;
        // Check for duplicates (if needed)
        const existingPatient = await Patient.findOne({patientCode:patientCode});
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient with this code  already exists' });
        }
        // Create and save the Patient
        const patients = new Patient({
            patientName, patientCode, isActive ,consultationDate ,historyOfFall,historyOfSurgery,historyOfSurgeryDetails,historyOfFallDetails,
             patientAge ,patientGenderId ,byStandar ,Relation,patientNumber,patientAltNum ,patientAddress ,patientPinCode,patientCondition,physioId,
             reviewDate,MedicalHistoryAndRiskFactor,otherMedCon,currMed,typesOfLifeStyle,smokingOrAlcohol,dietaryHabits,Contraindications
             ,painLevel,rangeOfMotion,muscleStrength,postureOrGaitAnalysis,functionalLimitations,ADLAbility,shortTermGoals,
             longTermGoals,RecomTherapy,Frequency,Duration,noOfDays,Modalities,targetedArea,hodNotes,Physiotherapist,sessionStartDate,sessionTime,
             totalSessionDays,InitialShorttermGoal,goalDuration,visitOrder,KmsfromHub,KmsfLPatienttoHub,Feedback,Satisfaction,kmsFromPrevious,reviewFrequency
            });
        await patients.save();

        res.status(200).json({ 
            message: 'Patient created successfully', 
            data: patients._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all Patient
exports.getAllPatients = async (req, res) => {
    try {
       const Patients = await Patient.find().populate("patientGenderId", "genderName").populate("MedicalHistoryAndRiskFactor.RiskFactorID","RiskFactorName").populate("physioId","physioName")
        if(!Patients){
            res.status(400).json({message:"patients is not found"})
        }
        
        res.status(200).json(Patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single Patient by name
exports.getByPatientsName = async (req, res) => {
    try {
        const Patients = await Patient.findOne({ patientName: req.body.name })
    
        if (!Patients) {
            return res.status(400).json({ message: 'Patients not found' });
        }

        res.status(200).json(Patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a Patients
exports.updatePatients= async (req, res) => {
    try {
           const { _id, patientName, patientCode, isActive ,consultationDate ,historyOfFall,historyOfSurgery,historyOfSurgeryDetails,historyOfFallDetails,
             patientAge ,patientGenderId ,byStandar ,Relation,patientNumber,patientAltNum ,patientAddress ,patientPinCode,patientCondition,physioId,
             reviewDate,MedicalHistoryAndRiskFactor,otherMedCon,currMed,typesOfLifeStyle,smokingOrAlcohol,dietaryHabits,Contraindications
             ,painLevel,rangeOfMotion,muscleStrength,postureOrGaitAnalysis,functionalLimitations,ADLAbility,shortTermGoals,
             longTermGoals,RecomTherapy,Frequency,Duration,noOfDays,Modalities,targetedArea,hodNotes,Physiotherapist,sessionStartDate,sessionTime,
             totalSessionDays,InitialShorttermGoal,goalDuration,visitOrder,KmsfromHub,KmsfLPatienttoHub,Feedback,Satisfaction,kmsFromPrevious,reviewFrequency
            } = req.body;

        const Patients = await Patient.findByIdAndUpdate(
            _id,
            { $set:{
              patientName, patientCode, isActive ,consultationDate ,historyOfFall,historyOfSurgery,historyOfSurgeryDetails,historyOfFallDetails,
             patientAge ,patientGenderId ,byStandar ,Relation,patientNumber,patientAltNum ,patientAddress ,patientPinCode,patientCondition,physioId,
             reviewDate,MedicalHistoryAndRiskFactor,otherMedCon,currMed,typesOfLifeStyle,smokingOrAlcohol,dietaryHabits,Contraindications
             ,painLevel,rangeOfMotion,muscleStrength,postureOrGaitAnalysis,functionalLimitations,ADLAbility,shortTermGoals,
             longTermGoals,RecomTherapy,Frequency,Duration,noOfDays,Modalities,targetedArea,hodNotes,Physiotherapist,sessionStartDate,sessionTime,
             totalSessionDays,InitialShorttermGoal,goalDuration,visitOrder,KmsfromHub,KmsfLPatienttoHub,Feedback,Satisfaction,kmsFromPrevious,reviewFrequency
            }},
            { new: true, runValidators: true }
        );

        if (!Patients) {
            return res.status(400).json({ message: 'Patients Cant able to update' });
        }

        res.status(200).json({ message: 'Patients updated successfully', data:Patients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a Patient
exports.deletePatients = async (req, res) => {
    try {
       
        const { _id } = req.body;
       
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const Patients = await Patient.findByIdAndDelete(_id);

        if (!Patients) {
            return res.status(400).json({ message: 'Patients not found' });
        }

        res.status(200).json({ message: 'Patients deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};