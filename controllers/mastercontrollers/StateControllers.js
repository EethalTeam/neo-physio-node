const mongoose = require('mongoose');
const State = require('../../model/masterModels/State');
const Country = require('../../model/masterModels/Country')

// Fields to extract for the response
// const fieldsToExtract = ['_id', 'StateCode', 'StateName', 'isActive'];

// Create a new State
exports.createState = async (req, res) => {
    try {
        const { StateCode, StateName, isActive,CountryId } = req.body;

        // Check for duplicates (if needed)
        const existingState = await State.findOne({ 
            $or: [
                { StateCode }, 
                { StateName }
            ] 
        });
        if (existingState) {
            return res.status(400).json({ message: 'State with this code or name already exists' });
        }
        // Create and save the new State
        const state = new State({ StateCode, StateName , isActive , CountryId});
        await state.save();

        res.status(200).json({ 
            message: 'State created successfully', 
            data: state._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all States
exports.getAllStates = async (req, res) => {
    try {
        //option 1 aggregate method
         
         const {CountryID} = req.body
        let filter={}
        if(CountryID){
            filter.CountryID=new mongoose.Types.ObjectId(CountryID)
        }

        const state= await State.aggregate([
              {$match:filter},
              {
                   $lookup:{
                from:'countries',
                localField:'CountryId',
                foreignField:'_id',
                as:'CountryInfo'
            }
              },
                {
            $unwind:{
                path:"$CountryInfo",
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $project:{
                _id:0,
                StateIDPK:'$_id',
                StateCode:1,
                StateName:1,
                isActive:1,
                CountryId:'$CountryInfo._id',
                countryCode:'$CountryInfo.countryCode',
                countryName:'$CountryInfo.countryName'
            }
        }
    ])
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single State by name
exports.getStateByName = async (req, res) => {
    try {
        const state = await State.findOne({ StateName: req.params.name })
    
        if (!state) {
            return res.status(400).json({ message: 'State not found' });
        }

        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a State
exports.updateState = async (req, res) => {
    try {
        const {StateIDPK,StateCode,StateName,isActive} = {...req.body};
        const state = await State.findByIdAndUpdate(
            StateIDPK,
            { $set:{StateCode,StateName,isActive}},
            { new: true, runValidators: true }
        );

        if (!state) {
            return res.status(400).json({ message: 'State not found' });
        }

        res.status(200).json({ message: 'State updated successfully', data: state });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a State
exports.deleteState = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const state = await State.findByIdAndDelete(_id);

        if (!state) {
            return res.status(400).json({ message: 'State not found' });
        }

        res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// get all country for dropdown 
exports.getAllCountry = async (req, res) => {
    try {
        //option 1 aggregate method
        const country = await Country.aggregate([
                 { $match: matchStage }, 
            {
                $project: {
                    _id: 0,
                    CountryIDPK: '$_id',
                    countryName: 1,
                    countryCode: 1,
                    isActive: 1
                }
            }
        ])
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



///fsdvsdfv

// exports.getAllCitys = async (req, res) => {
//     try {
//         //option 1 aggregate method
//         const {StateID} = req.body       
//         let filter={}
//         if(StateID){
//             filter.StateID=new mongoose.Types.ObjectId(StateID)
//         }
//         const city= await City.aggregate([
//             {$match:filter},
//             {
//             $lookup:{
//                 from:'states',
//                 localField:'StateID',
//                 foreignField:'_id',
//                 as:'StateInfo'
//             }
//         },
//         {
//             $unwind:{
//                 path:"$StateInfo",
//                 preserveNullAndEmptyArrays:true
//             }
//         },
//         {
//             $project:{
//                 _id:0,
//                 CityIDPK:'$_id',
//                 CityCode:1,
//                 CityName:1,
//                 StateID:'$StateInfo._id',
//                 StateCode:'$StateInfo.StateCode',
//                 StateName:'$StateInfo.StateName',
//                 isActive:1
//             }
//         }
//     ])
//     // const city = City.find({filter})
//         res.status(200).json(city);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };