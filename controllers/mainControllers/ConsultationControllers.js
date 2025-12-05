const mongoose = require('mongoose');
const Consultation = require('../../model/masterModels/Consultation')
const Session = require('../../model/masterModels/Session');
const Counter = require('../../model/masterModels/Counter')

// Create a new Patient
exports.createConsultation = async (req, res) => {
    try {
        const { patientName, patientCode, isActive, consultationDate, historyOfFall, historyOfSurgery, historyOfSurgeryDetails, historyOfFallDetails,
            patientAge, patientGenderId, byStandar, Relation, patientNumber, patientAltNum, patientAddress, patientPinCode, patientCondition, physioId,
            reviewDate, MedicalHistoryAndRiskFactor, otherMedCon, currMed, typesOfLifeStyle, smokingOrAlcohol, dietaryHabits, Contraindications
            , painLevel, rangeOfMotion, muscleStrength, postureOrGaitAnalysis, functionalLimitations, ADLAbility, shortTermGoals, goalDescription,
            longTermGoals, RecomTherapy, Frequency, Duration, noOfDays, Modalities, targetedArea, hodNotes, Physiotherapist, sessionStartDate, sessionTime,
            totalSessionDays, InitialShorttermGoal, goalDuration, visitOrder, KmsfromHub, KmsfLPatienttoHub, Feedback, Satisfaction, kmsFromPrevious, reviewFrequency,
            FeesTypeId,feeAmount,ReferenceId
        } = req.body;
        // Check for duplicates (if needed)
        const existingConsulate = await Consultation.findOne({ patientCode: patientCode });
        if (existingConsulate) {
            return res.status(400).json({ message: 'Consulation with this code  already exists' });
        }
        // Create and save the Patient
        const consulate = new Consultation({
            patientName, patientCode, isActive, consultationDate, historyOfFall, historyOfSurgery, historyOfSurgeryDetails, historyOfFallDetails,
            patientAge, patientGenderId, byStandar, Relation, patientNumber, patientAltNum, patientAddress, patientPinCode, patientCondition, physioId,
            reviewDate, MedicalHistoryAndRiskFactor, otherMedCon, currMed, typesOfLifeStyle, smokingOrAlcohol, dietaryHabits, Contraindications
            , painLevel, rangeOfMotion, muscleStrength, postureOrGaitAnalysis, functionalLimitations, ADLAbility, shortTermGoals, goalDescription,
            longTermGoals, RecomTherapy, Frequency, Duration, noOfDays, Modalities, targetedArea, hodNotes, Physiotherapist, sessionStartDate, sessionTime,
            totalSessionDays, InitialShorttermGoal, goalDuration, visitOrder, KmsfromHub, KmsfLPatienttoHub, Feedback, Satisfaction, kmsFromPrevious, reviewFrequency,
            FeesTypeId, feeAmount,ReferenceId
        });
        await consulate.save();

        res.status(200).json({
            message: 'Patient created successfully',
            data: consulate._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get allConsultation
exports.getAllConsultation = async (req, res) => {
    try {
        const consulate = await Consultation.find().populate("patientGenderId", "genderName").populate("MedicalHistoryAndRiskFactor.RiskFactorID", "RiskFactorName").populate("physioId", "physioName")
        if (!consulate) {
          return  res.status(400).json({ message: "consulate is not found" })
        }

        res.status(200).json(consulate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get a single consulate by name
exports.getByConsultationName = async (req, res) => {
    try {
        const consulate = await Consultation.findOne({ patientName: req.body.name })

        if (!consulate) {
            return res.status(400).json({ message: 'consulate not found' });
        }

        res.status(200).json(consulate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update a consulate
exports.updateConsultation = async (req, res) => {
    try {
        const { _id, patientName, patientCode, isActive, consultationDate, historyOfFall, historyOfSurgery, historyOfSurgeryDetails, historyOfFallDetails,
            patientAge, patientGenderId, byStandar, Relation, patientNumber, patientAltNum, patientAddress, patientPinCode, patientCondition, physioId,
            reviewDate, MedicalHistoryAndRiskFactor, otherMedCon, currMed, typesOfLifeStyle, smokingOrAlcohol, dietaryHabits, Contraindications
            , painLevel, rangeOfMotion, muscleStrength, postureOrGaitAnalysis, functionalLimitations, ADLAbility, shortTermGoals, goalDescription,
            longTermGoals, RecomTherapy, Frequency, Duration, noOfDays, Modalities, targetedArea, hodNotes, Physiotherapist, sessionStartDate, sessionTime,
            totalSessionDays, InitialShorttermGoal, goalDuration, visitOrder, KmsfromHub, KmsfLPatienttoHub, Feedback, Satisfaction, kmsFromPrevious, reviewFrequency,
            FeesTypeId,feeAmount,ReferenceId
        } = req.body;

        const consulate = await Consultation.findByIdAndUpdate(
            _id,
            {
                $set: {
                    patientName, patientCode, isActive, consultationDate, historyOfFall, historyOfSurgery, historyOfSurgeryDetails, historyOfFallDetails,
                    patientAge, patientGenderId, byStandar, Relation, patientNumber, patientAltNum, patientAddress, patientPinCode, patientCondition, physioId,
                    reviewDate, MedicalHistoryAndRiskFactor, otherMedCon, currMed, typesOfLifeStyle, smokingOrAlcohol, dietaryHabits, Contraindications
                    , painLevel, rangeOfMotion, muscleStrength, postureOrGaitAnalysis, functionalLimitations, ADLAbility, shortTermGoals, goalDescription,
                    longTermGoals, RecomTherapy, Frequency, Duration, noOfDays, Modalities, targetedArea, hodNotes, Physiotherapist, sessionStartDate, sessionTime,
                    totalSessionDays, InitialShorttermGoal, goalDuration, visitOrder, KmsfromHub, KmsfLPatienttoHub, Feedback, Satisfaction, kmsFromPrevious, reviewFrequency,
                    FeesTypeId,  feeAmount,ReferenceId
                }
            },
            { new: true, runValidators: true }
        );

        if (!consulate) {
            return res.status(400).json({ message: 'consulate Cant able to update' });
        }

        res.status(200).json({ message: 'consulate updated successfully', data: consulate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete a consulate
exports.deleteConsultation = async (req, res) => {
    try {

        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const consulate = await Consultation.findByIdAndDelete(_id);

        if (!consulate) {
            return res.status(400).json({ message: 'consulate not found' });
        }

        res.status(200).json({ message: 'Consulate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.AssignPhysio = async (req, res) => {
    try {
        const {
            _id,
            sessionStartDate,
            sessionTime,
            physioId,
            totalSessionDays,
            InitialShorttermGoal,
            goalDuration,
            goalDescription,
            reviewFrequency,
            visitOrder,
            KmsfromHub,
            KmsfLPatienttoHub,
            kmsFromPrevious
        } = req.body;

        const AssignPhysio = await Consultation.findByIdAndUpdate(
            _id,
            {
                $set: {
                    sessionStartDate,
                    sessionTime,
                    totalSessionDays,
                    InitialShorttermGoal,
                    goalDuration,
                    physioId,
                    goalDescription,
                    reviewFrequency,
                    visitOrder,
                    KmsfromHub,
                    KmsfLPatienttoHub,
                    kmsFromPrevious
                }
            },
            { new: true, runValidators: true }
        );

        if (!AssignPhysio) {
            return res.status(400).json({ message: 'AssignPhysio Cant able to update' });
        }

        const counter = await Counter.findByIdAndUpdate(
            { _id: 'sessionCode' },
            { $inc: { seq: totalSessionDays } }, 
            { new: true, upsert: true }
        );

        let nextSequenceNumber = counter.seq - totalSessionDays + 1;
       
        let currentDate = new Date(sessionStartDate);
        currentDate.setHours(12, 0, 0, 0);

        const sessionsToCreate = [];
        let sessionsGenerated = 0;
        
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        while (sessionsGenerated < totalSessionDays) {
            const currentDayIndex = currentDate.getDay(); 

            // Skip Sunday
            if (currentDayIndex === 0) {
                currentDate.setDate(currentDate.getDate() + 1);
                continue;
            }
            const formattedCode = `SESS-${String(nextSequenceNumber).padStart(6, '0')}`;

            sessionsToCreate.push({
                patientId: _id,
                physioId: physioId,
                sessionDate: new Date(currentDate), 
                sessionTime: sessionTime, 
                sessionStatusId: new mongoose.Types.ObjectId('691ecb36b87c5c57dead47a7'),
                sessionDay: daysOfWeek[currentDayIndex], 
                sessionCode: formattedCode
            });

            // Increment our local counters
            sessionsGenerated++;
            nextSequenceNumber++; // Move to the next number for the loop
            
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (sessionsToCreate.length > 0) {
            await Session.insertMany(sessionsToCreate);
        }

        res.status(200).json({ 
            message: `Assigned and generated ${sessionsToCreate.length} sessions (Range: ${sessionsToCreate[0].sessionCode} to ${sessionsToCreate[sessionsToCreate.length-1].sessionCode})`, 
            AssignPhysio: AssignPhysio 
        });

    } catch (error) {
        console.error("Error assigning physio:", error);
        res.status(500).json({ message: error.message });
    }
};