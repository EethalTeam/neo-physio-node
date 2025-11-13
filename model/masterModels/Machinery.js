const mongoose = require('mongoose')



// Define the Machinery Schema
const machineSchema = new mongoose.Schema({

    machineCode: {
        type: String,
        trim: true,
        
       
    },
    machineName: {
        type: String,
        trim: true,
      
    },
    machineCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineCategory',
     
    },
    machineDescription: {
        type: String,
        trim: true,
    },
    Manufacturer: {
        type: String,
        trim: true,
      
    },
    machineModel: {
        type: String,
        trim: true,
     
    },
    TotalStockCount: {
        type: Number, 
            trim: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    machineNote: {
        type: String,
        trim: true
    }


}
,{timestamps:true})
const Machine = mongoose.model('Machine', machineSchema)
module.exports = Machine