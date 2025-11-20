const mongoose = require('mongoose');
const SessionStatus = require('../../model/masterModels/SessionStatus')

// Create a new  SessionStatus
exports.createSessionStatus = async (req, res) => {
    try {
        const { sessionStatusName, sessionStatusCode, isActive ,sessionStatusColor,sessionStatusTextColor} = req.body;

        // Check for duplicates (if needed)
        const existingSessionStatus = await  SessionStatus.findOne({
            $or: [
                { sessionStatusName },
                { sessionStatusCode }
            ]
        });
        if (existingSessionStatus) {
            return res.status(400).json({ message: 'SessionStatus with this code or name already exists' });
        }
        // Create and save the new SessionStatus
        const sessionStatus = new SessionStatus({  sessionStatusName, sessionStatusCode, isActive ,sessionStatusColor,sessionStatusTextColor });
        await sessionStatus.save();

        res.status(200).json({
            message: 'SessionStatus created successfully',
            data: sessionStatus._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all sessionStatus
exports.getAllSessionStatus = async (req, res) => {
    try {
        const sessionStatus = await SessionStatus.find()
        res.status(200).json(sessionStatus)
        if(!sessionStatus){
            return res.status(400).json({message:"SessionStatus is not find"})
        }  
        res.status(200).json(sessionStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single sessionStatus by name
exports.getLeadStatusByName = async (req, res) => {
    try {
        const  sessionStatus = await SessionStatus.findOne({ sessionStatusName: req.body.sessionStatusName })

        if (!sessionStatus) {
            return res.status(400).json({ message: 'SessionStatus not found' });
        }

        res.status(200).json(sessionStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a sessionStatus
exports.updateSessionStatus = async (req, res) => {
    try {
        const { _id, sessionStatusName, sessionStatusCode, isActive ,sessionStatusColor,sessionStatusTextColor  } = req.body

        const sessionStatus = await SessionStatus.findByIdAndUpdate(
            _id,
            { $set: { sessionStatusName, sessionStatusCode, isActive ,sessionStatusColor,sessionStatusTextColor  } },
            { new: true, runValidators: true }
        );

        if (!sessionStatus) {
            return res.status(400).json({ message: 'sessionStatus not found' });
        }

        res.status(200).json({ message: 'SessionStatus updated successfully', data:sessionStatus  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a SessionStatus
exports.deleteSessionStatus = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const sessionStatus = await SessionStatus.findByIdAndDelete(_id);

        if (!sessionStatus) {
            return res.status(400).json({ message: 'sessionStatus not found' });
        }

        res.status(200).json({ message: 'sessionStatus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};