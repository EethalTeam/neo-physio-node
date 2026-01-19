const mongoose = require("mongoose");
const Patient = require("../../model/masterModels/Patient");
const Session = require("../../model/masterModels/Session");
const Counter = require("../../model/masterModels/Counter");

// Create a new Patient
exports.createPatients = async (req, res) => {
  try {
    const {
      patientName,
      patientCode,
      isActive,
      consultationDate,
      historyOfFall,
      historyOfSurgery,
      historyOfSurgeryDetails,
      historyOfFallDetails,
      patientAge,
      patientGenderId,
      byStandar,
      Relation,
      patientNumber,
      patientAltNum,
      patientAddress,
      patientPinCode,
      patientCondition,
      physioId,
      reviewDate,
      MedicalHistoryAndRiskFactor,
      otherMedCon,
      currMed,
      typesOfLifeStyle,
      smokingOrAlcohol,
      dietaryHabits,
      Contraindications,
      painLevel,
      rangeOfMotion,
      muscleStrength,
      postureOrGaitAnalysis,
      functionalLimitations,
      static,
      dynamic,
      coordination,
      ADLAbility,
      shortTermGoals,
      goalDescription,
      longTermGoals,
      RecomTherapy,
      Frequency,
      Duration,
      noOfDays,
      Modalities,
      targetedArea,
      hodNotes,
      Physiotherapist,
      sessionStartDate,
      sessionTime,
      totalSessionDays,
      InitialShorttermGoal,
      goalDuration,
      visitOrder,
      KmsfromHub,
      KmsfLPatienttoHub,
      Feedback,
      Satisfaction,
      kmsFromPrevious,
      reviewFrequency,
      FeesTypeId,
      feeAmount,
      ReferenceId,
    } = req.body;
    // Check for duplicates (if needed)
    // const existingPatient = await Patient.findOne({ patientCode: patientCode });
    // if (existingPatient) {
    //   return res
    //     .status(400)
    //     .json({ message: "Patient with this code  already exists" });
    // }

    // Get the last HNP patient to continue numbering
    const lastHnpPatient = await Patient.find({
      patientCode: { $regex: /^HNP/ },
    })
      .sort({ createdAt: -1 })
      .limit(1);

    let nextId = 1;
    if (lastHnpPatient.length > 0) {
      nextId =
        parseInt(lastHnpPatient[0].patientCode.replace("HNP", ""), 10) + 1;
    }

    // Assign the new patientCode
    const newHnpCode = `HNP${String(nextId).padStart(6, "0")}`;

    const createData={
      patientName,
      patientCode: newHnpCode,
      isActive,
      consultationDate,
      historyOfFall,
      historyOfSurgery,
      historyOfSurgeryDetails,
      historyOfFallDetails,
      patientAge,
      patientGenderId,
      byStandar,
      Relation,
      patientNumber,
      patientAltNum,
      patientAddress,
      patientPinCode,
      patientCondition,
      reviewDate,
      MedicalHistoryAndRiskFactor,
      otherMedCon,
      currMed,
      typesOfLifeStyle,
      smokingOrAlcohol,
      dietaryHabits,
      Contraindications,
      painLevel,
      rangeOfMotion,
      muscleStrength,
      postureOrGaitAnalysis,
      functionalLimitations,
      static,
      dynamic,
      coordination,
      ADLAbility,
      shortTermGoals,
      goalDescription,
      longTermGoals,
      RecomTherapy,
      Frequency,
      Duration,
      noOfDays,
      Modalities,
      targetedArea,
      hodNotes,
      Physiotherapist,
      sessionStartDate,
      sessionTime,
      totalSessionDays,
      InitialShorttermGoal,
      goalDuration,
      visitOrder,
      KmsfromHub,
      KmsfLPatienttoHub,
      Feedback,
      Satisfaction,
      kmsFromPrevious,
      reviewFrequency,
      feeAmount,
    }
    if(ReferenceId){
      createData.ReferenceId=ReferenceId
    }
    if(FeesTypeId){
      createData.FeesTypeId=FeesTypeId
    }
    if(physioId){
      createData.physioId=physioId
    }
    // Create and save the Patient
    const patients = new Patient(createData);
    await patients.save();

    res.status(200).json({
      message: "Patient created successfully",
      data: patients._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all Patient
exports.getAllPatients = async (req, res) => {
  // Replace all old CON codes sequentially (one-time, in-place)
  try {
    const conPatients = await Patient.find({
      patientCode: { $regex: /^CON/ },
    }).sort({ createdAt: 1 });
    if (conPatients.length > 0) {
      let counter = 1;
      for (const patient of conPatients) {
        patient.patientCode = `HNP${String(counter).padStart(6, "0")}`;
        await patient.save();
        counter++;
      }
    }

    // try {
    const Patients = await Patient.find()
      .populate("patientGenderId", "genderName")
      .populate("MedicalHistoryAndRiskFactor.RiskFactorID", "RiskFactorName")
      .populate("physioId", "physioName");
    if (!Patients) {
      res.status(400).json({ message: "patients is not found" });
    }

    res.status(200).json(Patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single Patient by name
exports.getByPatientsName = async (req, res) => {
  try {
    const Patients = await Patient.findOne({ patientName: req.body.name });

    if (!Patients) {
      return res.status(400).json({ message: "Patients not found" });
    }

    res.status(200).json(Patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a Patients
exports.updatePatients = async (req, res) => {
  try {
    const {
      _id,
      patientName,
      patientCode,
      isActive,
      consultationDate,
      historyOfFall,
      historyOfSurgery,
      historyOfSurgeryDetails,
      historyOfFallDetails,
      patientAge,
      patientGenderId,
      byStandar,
      Relation,
      patientNumber,
      patientAltNum,
      patientAddress,
      patientPinCode,
      patientCondition,
      physioId,
      reviewDate,
      MedicalHistoryAndRiskFactor,
      otherMedCon,
      currMed,
      typesOfLifeStyle,
      smokingOrAlcohol,
      dietaryHabits,
      Contraindications,
      painLevel,
      rangeOfMotion,
      muscleStrength,
      postureOrGaitAnalysis,
      functionalLimitations,
      static,
      dynamic,
      coordination,
      ADLAbility,
      shortTermGoals,
      goalDescription,
      longTermGoals,
      RecomTherapy,
      Frequency,
      Duration,
      noOfDays,
      Modalities,
      targetedArea,
      hodNotes,
      Physiotherapist,
      sessionStartDate,
      sessionTime,
      totalSessionDays,
      InitialShorttermGoal,
      goalDuration,
      visitOrder,
      KmsfromHub,
      KmsfLPatienttoHub,
      Feedback,
      Satisfaction,
      kmsFromPrevious,
      reviewFrequency,
      FeesTypeId,
      feeAmount,
      ReferenceId,
      isRecovered,
    } = req.body;

    const Patients = await Patient.findByIdAndUpdate(
      _id,
      {
        $set: {
          patientName,
          patientCode,
          isActive,
          consultationDate,
          historyOfFall,
          historyOfSurgery,
          historyOfSurgeryDetails,
          historyOfFallDetails,
          patientAge,
          patientGenderId,
          byStandar,
          Relation,
          patientNumber,
          patientAltNum,
          patientAddress,
          patientPinCode,
          patientCondition,
          physioId,
          reviewDate,
          MedicalHistoryAndRiskFactor,
          otherMedCon,
          currMed,
          typesOfLifeStyle,
          smokingOrAlcohol,
          dietaryHabits,
          Contraindications,
          painLevel,
          rangeOfMotion,
          muscleStrength,
          postureOrGaitAnalysis,
          functionalLimitations,
          static,
          dynamic,
          coordination,
          ADLAbility,
          shortTermGoals,
          goalDescription,
          longTermGoals,
          RecomTherapy,
          Frequency,
          Duration,
          noOfDays,
          Modalities,
          targetedArea,
          hodNotes,
          Physiotherapist,
          sessionStartDate,
          sessionTime,
          totalSessionDays,
          InitialShorttermGoal,
          goalDuration,
          visitOrder,
          KmsfromHub,
          KmsfLPatienttoHub,
          Feedback,
          Satisfaction,
          kmsFromPrevious,
          reviewFrequency,
          FeesTypeId,
          feeAmount,
          ReferenceId,
          isRecovered,
        },
      },
      { new: true, runValidators: true },
    );

    if (!Patients) {
      return res.status(400).json({ message: "Patients Cant able to update" });
    }

    res
      .status(200)
      .json({ message: "Patients updated successfully", data: Patients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a Patient
exports.deletePatients = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const Patients = await Patient.findByIdAndDelete(_id);

    if (!Patients) {
      return res.status(400).json({ message: "Patients not found" });
    }

    res.status(200).json({ message: "Patients deleted successfully" });
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
      kmsFromPrevious,
    } = req.body;

    const AssignPhysio = await Patient.findByIdAndUpdate(
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
          kmsFromPrevious,
        },
      },
      { new: true, runValidators: true },
    );

    if (!AssignPhysio) {
      return res
        .status(400)
        .json({ message: "AssignPhysio Cant able to update" });
    }

    const counter = await Counter.findByIdAndUpdate(
      { _id: "sessionCode" },
      { $inc: { seq: totalSessionDays } },
      { new: true, upsert: true },
    );

    let nextSequenceNumber = counter.seq - totalSessionDays + 1;

    let currentDate = new Date(sessionStartDate);
    currentDate.setHours(12, 0, 0, 0);

    const sessionsToCreate = [];
    let sessionsGenerated = 0;

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    while (sessionsGenerated < totalSessionDays) {
      const currentDayIndex = currentDate.getDay();

      // Skip Sunday
      if (currentDayIndex === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }
      const formattedCode = `SESS-${String(nextSequenceNumber).padStart(
        6,
        "0",
      )}`;

      sessionsToCreate.push({
        patientId: _id,
        physioId: physioId,
        sessionDate: new Date(currentDate),
        sessionTime: sessionTime,
        sessionStatusId: new mongoose.Types.ObjectId(
          "691ecb36b87c5c57dead47a7",
        ),
        sessionDay: daysOfWeek[currentDayIndex],
        sessionCode: formattedCode,
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
      message: `Assigned and generated ${
        sessionsToCreate.length
      } sessions (Range: ${sessionsToCreate[0].sessionCode} to ${
        sessionsToCreate[sessionsToCreate.length - 1].sessionCode
      })`,
      AssignPhysio: AssignPhysio,
    });
  } catch (error) {
    console.error("Error assigning physio:", error);
    res.status(500).json({ message: error.message });
  }
};
