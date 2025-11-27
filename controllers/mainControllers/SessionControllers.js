const mongoose = require('mongoose')
const Session = require('../../model/masterModels/Session')
const SessionStatus = require('../../model/masterModels/SessionStatus')
const Patient = require('../../model/masterModels/Patient')
const PetrolAllowance = require('../../model/masterModels/PetrolAllowance')


// Create a new Session
exports.createSession = async (req, res) => {
    try {
        const {
          
            patientId,
            physioId,
            sessionDate,
            sessionDay,
            sessionTime,
            sessionFromTime,
            sessionToTime,
            machineId,
            sessionStatusId,
            sessionFeedbackPros,
            sessionFeedbackCons,
            modeOfExercise,
            redFlags,
            homeExerciseAssigned,
            modalities,
            modalitiesList,
            targetArea,
            media
        } = req.body;

        //Automatic code genrate

         const lastSession = await Session.findOne({}, {}, { sort: { 'createdAt': -1 } });
    let nextSessionNumber = 1;
    
    if (lastSession && lastSession.sessionCode) {
      const lastNumber = parseInt(lastSession.sessionCode.replace('SESSION', ''));
      nextSessionNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;
    }
    
    const sessionCode = `SESSION${String(nextSessionNumber).padStart(3, '0')}`;

        // Create and save the Session
        const session = new Session({
            sessionCode,
            patientId,
            physioId,
            sessionDate,
            sessionDay,
            sessionTime,
            sessionFromTime,
            sessionToTime,
            machineId,
            sessionStatusId,
            sessionFeedbackPros,
            sessionFeedbackCons,
            modeOfExercise,
            redFlags,
            homeExerciseAssigned,
            modalities,
            modalitiesList,
            targetArea,
            media
        });
        await session.save();

        res.status(200).json({
            message: 'Session created successfully',
            data: session
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all Session
exports.getAllSession = async (req, res) => {
    try {
        const {sessionDate,nextDate,physioId} = req.body
        let filter={}
        console.log(sessionDate,"sessionDate")
          
        if(sessionDate){
            filter.sessionDate={$gte:sessionDate,$lt:nextDate}
        }
        if(physioId){
            filter.physioId = physioId
        }
        console.log(filter,"filter")
        const session = await Session.find(filter).populate("physioId", "physioName").populate("modalitiesList.modalityId", 'modalitiesName').populate("patientId", "patientName").populate("machineId", "machineName").populate('sessionStatusId', 'sessionStatusName sessionStatusColor sessionStatusTextColor').populate('redFlags.redFlagId','redflagName')
        if (!session) {
            res.status(400).json({ message: "Session is not found" })
        }

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single Session by id
exports.getSingleSession = async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.body })

        if (!session) {
            return res.status(400).json({ message: 'Session not found' });
        }

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a Session
exports.updateSession = async (req, res) => {
    try {
          if(req.body.machineId === '' || req.body.machineId === undefined ){
            req.body.machineId = null
          }
        const { _id,
            sessionCode,
            patientId,
            physioId,
            sessionDate,
            sessionDay,
            sessionTime,
            sessionFromTime,
            sessionToTime,
           
            sessionStatusId,
            sessionFeedbackPros,
            sessionFeedbackCons,
            modeOfExercise,
            redFlags,
            homeExerciseAssigned,
            modalities,
            modalitiesList,
            targetArea,
            media
        } = req.body;

        const session = await Session.findByIdAndUpdate(
            _id,
            {
                $set: {
                    sessionCode,
                    patientId,
                    physioId,
                    sessionDate,
                    sessionDay,
                    sessionTime,
                    sessionFromTime,
                    sessionToTime,
                     machineId :req.body.machineId ,
                    sessionStatusId,
                    sessionFeedbackPros,
                    sessionFeedbackCons,
                    modeOfExercise,
                    redFlags,
                    homeExerciseAssigned,
                    modalities,
                    modalitiesList,
                    targetArea,
                    media
                }
            },
            { new: true, runValidators: true }
        );

        if (!session) {
            return res.status(400).json({ message: 'session Cant able to update' });
        }

        res.status(200).json({ message: 'session updated successfully', data: session });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a session
exports.deleteSession = async (req, res) => {
    try {

        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const session = await Session.findByIdAndDelete(_id);

        if (!session) {
            return res.status(400).json({ message: 'Session not able to deleted' });
        }

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//Session Start Controller
 
exports.SessionStart = async (req,res) => {
    try {
        const {_id,sessionFromTime,action} = req.body
        
        const Status = await SessionStatus.findOne({sessionStatusName:action})
        if(!Status){
             res.status(400).json({message:"Session Status is not found"})
        }
        const session = await Session.findByIdAndUpdate(_id,{ 
            $set:
            {sessionFromTime:sessionFromTime,sessionStatusId:Status._id}
         },{new:true,runValidators: true})
        if(!session){
            res.status(400).json({message:"Session not started"})
        }
        res.status(200).json(session)
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
}

//Session Canceled
exports.SessionCancel = async (req,res)=>{
    try {
        const {_id,action,cancelledKms} = req.body
         const Status = await SessionStatus.findOne({sessionStatusName:action})
        if(!Status){
             res.status(400).json({message:"Session Status is not found"})
        }
        const session = await Session.findByIdAndUpdate(_id,{
            $set:
            {sessionStatusId:Status._id}
        },{new:true,runValidators:true})
        if(!session){
             res.status(400).json({message:"Session not Cancel"})
        }

            res.status(200).json(session)
    
         const patient = await Patient.findById(session.patientId);
             if (patient) {
            let kmsToAdd = 0;

            // Logic based on Visit Order
         
  if (patient.KmsfLPatienttoHub && patient.KmsfLPatienttoHub > 0) {
                kmsToAdd += patient.KmsfLPatienttoHub;
            }
             const allowanceDate = new Date(session.sessionDate);
            allowanceDate.setHours(12, 0, 0, 0);

            // C. Update the PetrolAllowance Table
            // We assume "Completed" sessions go to completedKms. 
            // If you have a specific status for "Canceled upon arrival", you can add logic to update 'canceledKms' instead.
            console.log(kmsToAdd,"kmstoadd")
            await PetrolAllowance.findOneAndUpdate(
                { 
                    physioId: session.physioId, 
                    date: allowanceDate 
                },
                { 
                    $inc: { 
                        completedKms: kmsToAdd,
                        canceledKms: cancelledKms, 
                        finalDailyKms: kmsToAdd 
                    } 
                },
                { 
                    new: true, 
                    upsert: true // Create the record if it doesn't exist yet
                }
            );
        }


      

    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}


//Session End Controllers

exports.SessionEnd = async (req, res) => {
    try {
        const {
            _id,
            machineId,
            sessionFeedbackPros,
            redFlags,
            targetArea,
            modalities,
            modalitiesList,
            sessionToTime,
            action // e.g., "Completed", "Patient Absent"
        } = req.body;

    let sessionend={
 _id,
            sessionFeedbackPros,
            redFlags,
            targetArea,
            modalities,
            modalitiesList,
            sessionToTime,
            action
    }
    if(machineId){
        sessionend.machineId=machineId
    }

        // 1. Validate Status
        const Status = await SessionStatus.findOne({ sessionStatusName: action });
        if (!Status) {
            return res.status(400).json({ message: "Session Status is not found" });
        }

        // 2. Update Session (Standard Logic)
        const session = await Session.findByIdAndUpdate(
            _id,
            {
                $set: sessionend
            },
            { new: true, runValidators: true }
        );
            
        
        if (!session) {
            return res.status(400).json({ message: "Session End is not found" });
        }

        // ---------------------------------------------------------
        // 3. PETROL ALLOWANCE LOGIC
        // ---------------------------------------------------------
        
        // A. Fetch Patient to get Distance details
        const patient = await Patient.findById(session.patientId);
        console.log(patient,"patient")
        if (patient) {
            let kmsToAdd = 0;

            // Logic based on Visit Order
            if (patient.visitOrder === 1) {
                // CASE 1: First Patient -> Add 'KmsfromHub'
                kmsToAdd = patient.KmsfromHub || 0;
            } else {
                // CASE 2: Middle Patients -> Add 'kmsFromPrevious'
                kmsToAdd = patient.kmsFromPrevious || 0;
            }

            // CASE 3: Check if this is the Last Patient (Return Trip)
            // Logic: If 'KmsfLPatienttoHub' exists and is > 0, we treat this as the closing trip
            // This allows accurate calculation regardless of the exact visitOrder number
            if (patient.KmsfLPatienttoHub && patient.KmsfLPatienttoHub > 0) {
                kmsToAdd += patient.KmsfLPatienttoHub;
            }

            // B. Determine the Allowance Date
            // We need to match the Date format used in AssignPhysio (Noon time to avoid timezone issues)
            const allowanceDate = new Date(session.sessionDate);
            allowanceDate.setHours(12, 0, 0, 0);

            // C. Update the PetrolAllowance Table
            // We assume "Completed" sessions go to completedKms. 
            // If you have a specific status for "Canceled upon arrival", you can add logic to update 'canceledKms' instead.
            console.log(kmsToAdd,"kmstoadd")
            await PetrolAllowance.findOneAndUpdate(
                { 
                    physioId: session.physioId, 
                    date: allowanceDate 
                },
                { 
                    $inc: { 
                        completedKms: kmsToAdd, 
                        finalDailyKms: kmsToAdd 
                    } 
                },
                { 
                    new: true, 
                    upsert: true // Create the record if it doesn't exist yet
                }
            );
        }
        // ---------------------------------------------------------

        res.status(200).json(session);

    } catch (error) {
        console.error("Error Ending Session:", error);
        res.status(500).json({ message: error.message });
    }
};




