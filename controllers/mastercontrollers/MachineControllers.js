const mongoose = require('mongoose')
const Machine = require('../../model/masterModels/Machinery')

//Create Machinery 

exports.createMachine = async (req,res) =>{
     
    try {
        const {
        machineCode,
        machineName,
        machineCategoryID,
        machineDescription,
        Manufacturer,
        machineModel,
        TotalStockCount,
        isActive,
        machineNote
    } = req.body

     const existingMachine = await Machine.findOne({
        $or :[
            {machineCode},
            {machineName}, 
            
        ]
     })
      if (existingMachine) {
            return res.status(400).json({ message: 'Machine with this code or name already exists' });
        }

         const Machines = new Machine({
         machineCode,  machineName, machineCategoryID,machineDescription,Manufacturer, machineModel,TotalStockCount,isActive, machineNote
         })
         await Machines.save()
          res.status(200).json({message:"Machinery create successfully", data:Machines._id})

    } catch (error) {
            res.status(500).json({ message: error.message });
    }

}


//get all Machine 

exports.getAllMachine = async (req,res)=>{
       try {
           const Machines = await Machine.find()
           res.status(200).json(Machines)
           if(!Machines){
            return res.status(400).json({message:'Machine is not find'})
           }
       } catch (error) {
        res.status(500).json({ message: error.message });
       }
}



// Get a single Machine  by Name
exports.getMachineByName = async (req, res) => {
    try {
        
        const Machines = await Machine.findOne({ machineName: req.body.machineName })
    
        if (!Machines) {
            return res.status(400).json({ message: 'Machine not found' });
        }

        res.status(200).json(Machines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update Machine

exports.updateMaachine = async (req,res) => {
    try {
        const {
        machineId,  machineCode,  machineName, machineCategoryID,machineDescription,Manufacturer, machineModel,TotalStockCount,isActive, machineNote
        } = req.body

        const Machines = await Machine.findByIdAndUpdate(
        machineId,
        {$set:{machineCode,  machineName, machineCategoryID,machineDescription,Manufacturer, machineModel,TotalStockCount,isActive, machineNote}},
        {new:true, runValidators:true}
    )
    
        if (!Machines) {
            return res.status(400).json({ message: 'Machine not found' });
        }

        res.status(200).json({message:"Machine update successfully",data:Machines})


    } catch (error) {
           res.status(500).json({ message: error.message });
    }
}



// Delete a Machine
exports.deleteMachine = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const Machines = await Machine.findByIdAndDelete(_id);

        if (!Machines) {
            return res.status(400).json({ message: 'Machine not found' });
        }

        res.status(200).json({ message: 'Machine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};