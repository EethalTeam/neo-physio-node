const mongoose = require('mongoose')
const Session = require('../../model/masterModels/Session')
const SessionStatus = require('../../model/masterModels/SessionStatus')


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
        const {sessionDate,nextDate} = req.body
        let filter={}
        console.log(sessionDate,"sessionDate")
        if(sessionDate){
            filter.sessionDate={$gte:sessionDate,$lt:nextDate}
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
        const { _id,
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


//Session End Controllers

exports.SessionEnd = async (req,res) => {
    try {
        const {_id,machineId,sessionFeedbackPros,redFlags,targetArea,modalities,modalitiesList,sessionToTime,action} = req.body
        // console.log(_id,machineId,sessionFeedbackPros,redFlags,targetArea,modalities,modalitiesList,sessionToTime,action,"_id,machineId,sessionFeedbackPros,sessionFeedbackCons,redFlags,targetArea,modalityId,sessionToTime,action")
        //  res.status(200).json("testing")
        const Status =  await SessionStatus.findOne({sessionStatusName:action})
        if(!Status){
                 res.status(400).json({message:"Session Status is not found"})
        }

        const session = await Session.findByIdAndUpdate(_id,
           { $set:
            {machineId,sessionFeedbackPros,redFlags,targetArea,modalities,modalitiesList,sessionStatusId:Status._id,sessionToTime:sessionToTime}
        },{new:true,runValidators: true})
        if(!session){
            res.status(400).json({message:"Session End is not found"})
        }
        res.status(200).json(session)
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
}





