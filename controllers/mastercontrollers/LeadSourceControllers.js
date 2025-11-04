const mongoose = require('mongoose');
const Lead = require('../../model/masterModels/LeadSource')

// Create a new LeadSource
exports.createLeadSource = async (req, res) => {
    try {
        const { leadSourceName, leadSourceCode, isActive } = req.body;

        // Check for duplicates (if needed)
        const existingLead = await Lead.findOne({
            $or: [
                { leadSourceName },
                { leadSourceCode }
            ]
        });
        if (existingLead) {
            return res.status(400).json({ message: 'LeadSource with this code or name already exists' });
        }
        // Create and save the new LeadSource
        const LeadSource = new Lead({ leadSourceName, leadSourceCode, isActive  });
        await LeadSource.save();

        res.status(200).json({
            message: 'leadSource created successfully',
            data: LeadSource._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all LeadSource
exports.getAllLeadSource = async (req, res) => {
    try {
        //option 1 aggregate method
        const LeadSource = await Lead.aggregate([
            {
                $project: {
                    _id: 0,
                    LeadIDPK: '$_id',
                    leadSourceName: 1,
                    leadSourceCode: 1,
                    isActive: 1
                }
            }
        ])
        res.status(200).json(LeadSource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single leadSource by name
exports.getLeadsourceByName = async (req, res) => {
    try {
        const  LeadSource = await Lead.findOne({ leadSourceName: req.body.leadSourceName })

        if (!LeadSource) {
            return res.status(400).json({ message: 'LeadSource not found' });
        }

        res.status(200).json(LeadSource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a LeadSource
exports.updateLeadSource = async (req, res) => {
    try {
        const { LeadIDPK, leadSourceName, leadSourceCode, isActive  } = req.body

        const LeadSource = await Lead.findByIdAndUpdate(
            LeadIDPK,
            { $set: { leadSourceName, leadSourceCode, isActive } },
            { new: true, runValidators: true }
        );

        if (!LeadSource) {
            return res.status(400).json({ message: 'LeadSource not found' });
        }

        res.status(200).json({ message: 'LeadSource updated successfully', data:LeadSource  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a LeadSource
exports.deleteLeadSource = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const LeadSource = await Lead.findByIdAndDelete(_id);

        if (!LeadSource) {
            return res.status(400).json({ message: 'LeadSource not found' });
        }

        res.status(200).json({ message: 'LeadSource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};