const Country = require('../../model/masterModels/Country')

// Create a new Country
exports.createCountry = async (req, res) => {
    try {
        const { countryName, countryCode, isActive } = req.body;

        // Check for duplicates (if needed)
        const existingCountry = await Country.findOne({ 
            $or: [
                { countryName }, 
                { countryCode }
            ] 
        });
        if (existingCountry) {
            return res.status(400).json({ message: 'Country with this code or name already exists' });
        }
        // Create and save the new Country
        const country = new Country({ countryName, countryCode , isActive });
        await country.save();

        res.status(200).json({ 
            message: 'country created successfully', 
            data: country._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all Country
exports.getAllCountry = async (req, res) => {
    try {
        //option 1 aggregate method
        const country= await Country.aggregate([
        {
            $project:{
                _id:0,
                CountryIDPK:'$_id',
                countryName:1,
                countryCode:1,
                isActive:1
            }
        }
    ])
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single Country by name
exports.getCountryByName = async (req, res) => {
    try {
        const country = await Country.findOne({ countryName: req.body.name })
    
        if (!country) {
            return res.status(400).json({ message: 'Country not found' });
        }

        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a Country
exports.updateCountry= async (req, res) => {
    try {
        const {CountryIDPK,countryName,countryCode,isActive} = {...req.body};
        const country = await Country.findByIdAndUpdate(
            CountryIDPK,
            { $set:{countryName,countryCode,isActive}},
            { new: true, runValidators: true }
        );

        if (!country) {
            return res.status(400).json({ message: 'Country not found' });
        }

        res.status(200).json({ message: 'Country updated successfully', data: state });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a Country
exports.deleteCountry = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const country = await Country.findByIdAndDelete(_id);

        if (!country) {
            return res.status(400).json({ message: 'Country not found' });
        }

        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};