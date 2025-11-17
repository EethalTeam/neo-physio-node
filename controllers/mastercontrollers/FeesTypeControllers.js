const mongoose = require('mongoose')
const FeesType = require('../../model/masterModels/FeesType')

//Create Fees Type

exports.createFeesType = async (req,res) =>{
     
    try {
        const {
        feesTypeName,feesTypeCode,isActive } = req.body

     const existingFeesType = await FeesType.findOne({
        $or :[
            {feesTypeCode},
            {feesTypeName}, 
            
        ]
     })
      if (existingFeesType) {
            return res.status(400).json({ message: 'FeesType with this code or name already exists' });
        }

         const feeType = new FeesType({
          feesTypeName,feesTypeCode,isActive
         })
         await feeType.save()
          res.status(200).json({message:"FeesType successfully", data:feeType})

    } catch (error) {
            res.status(500).json({ message: error.message });
    }

}


//get all Fees Type 

exports.getAllFeesType = async (req,res)=>{
       try {
           const feeType = await FeesType.find()
           res.status(200).json(feeType)
           if(!feeType){
            return res.status(400).json({message:'Fees Type is not find'})
           }
       } catch (error) {
        res.status(500).json({ message: error.message });
       }
}



// Get a single Fees Type  by Name
exports.getFeesTypeByName = async (req, res) => {
    try {
        
        const feeType = await FeesType.findOne({ feesTypeName: req.body.feesTypeName })
    
        if (!feeType) {
            return res.status(400).json({ message: 'Fees Type not found' });
        }

        res.status(200).json(feeType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update  Fees Type

exports.updateFeesType= async (req,res) => {
    try {
       
               const { _id,feesTypeName,feesTypeCode,isActive } = req.body

        const feeType = await FeesType.findByIdAndUpdate(
        _id,
        {$set:{feesTypeName,feesTypeCode,isActive }},
        {new:true, runValidators:true}
    )
    
        if (!feeType) {
            return res.status(400).json({ message: 'Fees Type not found' });
        }

        res.status(200).json({message:"Fees Types update successfully",data:feeType})


    } catch (error) {
           res.status(500).json({ message: error.message });
    }
}



// Delete a Fees Type
exports.deleteFeesType= async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const feeType = await FeesType.findByIdAndDelete(_id);

        if (!feeType) {
            return res.status(400).json({ message: 'Fees Type not found' });
        }

        res.status(200).json({ message: 'FeesType deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};