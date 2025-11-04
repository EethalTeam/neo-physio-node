const mongoose = require("mongoose");
const Reference = require("../../model/masterModels/Reference")



// create Reference
exports.createReference = async(req,res) => {
try {
    const {
    sourceCode,sourceName,IsperPatient,IsperSession,Ispercentage,Isrupees,CommissionPercentage,commissionAmount
} = req.body


// Check for duplicates (if needed)
const exitingReference = await Reference.findOne({
    $or:[
        {sourceCode},
        {sourceName}
    ]
})

if(exitingReference){
    return   res.status(400).json({ message: 'Reference with this code or name already exists' });
}
 
const Refer = new Reference({
    sourceCode,sourceName,IsperPatient,IsperSession,Ispercentage,Isrupees,CommissionPercentage,commissionAmount
})
await Refer.save()
res.status(200).json({message:"References Create successfully",data:Refer._id})

} catch (error) {
      res.status(500).json({ message: error.message });
}
}

//getAllReferences

exports.getAllReference = async (req,res) => {

    try {
        const Refer = await Reference.find()
        res.status(200).json(Refer)
        if(!Refer){
            return res.status(400).json({message:"References is not find"})
        }    
    } catch (error) {
          res.status(500).json({ message: error.message });
    }

}


//get single Reeference by Name

exports.getSingleReference = async (req,res) => {
    try {
        
        const Refer = await Reference.findOne({sourceName: req.body.sourceName})
        if(!Refer){
            return res.status(400).json({message:"References is not find"})
        }
        res.status(200).json(Refer)
        
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
}


//update References

exports.updateReferences = async (req,res) => {
    try {
           
        const {
            Refer_id,sourceCode,sourceName,IsperPatient,IsperSession,Ispercentage,Isrupees,CommissionPercentage,commissionAmount
        } = req.body

        const Refer = await Reference.findByIdAndUpdate(Refer_id,{
            $set:{sourceCode,sourceName,IsperPatient,IsperSession,Ispercentage,Isrupees,CommissionPercentage,commissionAmount}
        },{new:true,runValidators:true})

        if(!Refer){
            return res.status(400).json({message:"References is not update"})
        }
        res.status(200).json(Refer)
        
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
}


//delete References

exports.deleteReferences = async (req,res) =>{
    try {
        const {_id} = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)){
             return res.status(400).json({ message: 'Invalid ID' });
        }
        const Refer = await Reference.findByIdAndDelete(_id)
        if(!Refer){
            res.status(400).json({message:"References is unable to delete"})
        }
        res.status(200).json({message:"References delete successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}