const mongoose = require('mongoose')
const Session = require('../../model/masterModels/Session')



// Create a new Session
exports.createSession = async (req, res) => {
    try {
        const {
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
        const session = await Session.find().populate("physioId", "physioName").populate("modalitiesList.modalityId", 'modalitiesName').populate("patientId", "patientName").populate("machineId", "machineName").populate('sessionStatusId', 'sessionStatusName sessionStatusColor sessionStatusTextColor').populate('redFlags.redFlagId','redflagName')
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
            return res.status(400).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







