const mongoose = require('mongoose');
const LeadStatus = require('../../model/masterModels/Leadstatus')

// Create a new  LeadStatus
exports.createLeadStatus = async (req, res) => {
    try {
        const { leadStatusName, leadStatusCode, isActive } = req.body;

        // Check for duplicates (if needed)
        const existingLeadStatus = await  LeadStatus.findOne({
            $or: [
                { leadStatusName },
                { leadStatusCode }
            ]
        });
        if (existingLeadStatus) {
            return res.status(400).json({ message: 'LeadStatus with this code or name already exists' });
        }
        // Create and save the new LeadSource
        const leadStatus = new LeadStatus({ leadStatusName, leadStatusCode, isActive  });
        await leadStatus.save();

        res.status(200).json({
            message: 'leadStatus created successfully',
            data: leadStatus._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all LeadStatus
exports.getAllLeadStatus = async (req, res) => {
    try {
        const leadStatus = await LeadStatus.find()
        res.status(200).json(leadStatus)
        if(!leadStatus){
            return res.status(400).json({message:"LeadStatus is not find"})
        }  
        res.status(200).json(leadStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single leadStatus by name
exports.getLeadStatusByName = async (req, res) => {
    try {
        const  leadStatus = await LeadStatus.findOne({ leadStatusName: req.body.leadStatusName })

        if (!leadStatus) {
            return res.status(400).json({ message: 'LeadStatus not found' });
        }

        res.status(200).json(leadStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a LeadStatus
exports.updateLeadStatus = async (req, res) => {
    try {
        const { _id, leadStatusName, leadStatusCode, isActive  } = req.body

        const leadStatus = await LeadStatus.findByIdAndUpdate(
            _id,
            { $set: { leadStatusName, leadStatusCode, isActive } },
            { new: true, runValidators: true }
        );

        if (!leadStatus) {
            return res.status(400).json({ message: 'LeadStatus not found' });
        }

        res.status(200).json({ message: 'LeadStatus updated successfully', data:leadStatus  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a LeadStatus
exports.deleteLeadStatus = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const leadStatus = await LeadStatus.findByIdAndDelete(_id);

        if (!leadStatus) {
            return res.status(400).json({ message: 'LeadStatus not found' });
        }

        res.status(200).json({ message: 'LeadStatus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};