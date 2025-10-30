const Redflag = require('../../model/masterModels/Redflag')

// Create a new Redflag
exports.createRedflag = async (req, res) => {
    try {
        const { redflagName, redflagCode, isActive } = req.body;

        // Check for duplicates (if needed)
        const existingRedflag = await Redflag.findOne({ 
            $or: [
                { redflagName }, 
                { redflagCode }
            ] 
        });
        if (existingRedflag) {
            return res.status(400).json({ message: 'Redflag with this code or name already exists' });
        }
        // Create and save the Redflag
        const redflag = new Redflag({ redflagName, redflagCode , isActive });
        await redflag.save();

        res.status(200).json({ 
            message: 'Redflag created successfully', 
            data: redflag._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all Redflag
exports.getAllRedflag = async (req, res) => {
    try {
        //option 1 aggregate method
        const redflag= await Redflag.aggregate([
        {
            $project:{
                _id:0,
                RedflagIDPK:'$_id',
                redflagName:1,
                redflagCode:1,
                isActive:1
            }
        }
    ])
        res.status(200).json(redflag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single Redflag by name
exports.getRedflagByName = async (req, res) => {
    try {
        const redflag = await Redflag.findOne({ redflagName: req.body.name })
    
        if (!redflag) {
            return res.status(400).json({ message: 'Redflag not found' });
        }

        res.status(200).json(redflag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a Redflag
exports.updateRedflag= async (req, res) => {
    try {
        const {RedflagIDPK,redflagName,redflagCode,isActive} = {...req.body};
        const redflag = await Redflag.findByIdAndUpdate(
            RedflagIDPK,
            { $set:{redflagName,redflagCode,isActive}},
            { new: true, runValidators: true }
        );

        if (!redflag) {
            return res.status(400).json({ message: 'Redflag not found' });
        }

        res.status(200).json({ message: 'Redflag updated successfully', data: state });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a Redflag
exports.deleteRedflag = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const redflag = await Redflag.findByIdAndDelete(_id);

        if (!redflag) {
            return res.status(400).json({ message: 'Redflag not found' });
        }

        res.status(200).json({ message: 'Redflag deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};