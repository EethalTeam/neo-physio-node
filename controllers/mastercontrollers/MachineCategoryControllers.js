const mongoose = require('mongoose')
const Category = require('../../model/masterModels/MachineCategory')


//create machinecategory

exports.createMachineCate = async (req,res) =>{
    try {
        const {categoryCode,categoryName,isActive}=req.body

        //  const existingMachineCate = await Category.findOne({ 
        //     $or: [
        //         { categoryCode }, 
        //         { categoryName }
                
        //     ] 
        // });
        // if (existingMachineCate) {
        //     return res.status(400).json({ message: 'MachineCategory  with this code or name already exists' });
        // }

        const Machcate = new Category({categoryCode, categoryName , isActive })
        await Machcate.save()

         res.status(200).json({message:"MachineCategory create successfully", data:Machcate._id})
           
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}


//get all category
exports.getAllMachCate = async (req, res) => {
    try {
        //option 1 aggregate method
        const Machcate= await Category.aggregate([
        {
            $project:{
                _id:0,
                MachcateIDPK:'$_id',
                categoryCode:1,
                categoryName:1,
                isActive:1
            }
        }
    ])
        res.status(200).json(Machcate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a single Machinery Category by Name
exports.getMachCateByName = async (req, res) => {
    try {
        const Machcate = await Category.findOne({ categoryName: req.body.categoryName })
    
        if (!Machcate) {
            return res.status(400).json({ message: 'Category not found' });
        }

        res.status(200).json(Machcate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a MachineCategory
exports.updateMachCate= async (req, res) => {
    try {
        const {MachcateIDPK,categoryName,categoryCode,isActive} = req.body
        const Machcate = await Category.findByIdAndUpdate(
            MachcateIDPK,
            { $set:{categoryName,categoryCode,isActive}},
            { new: true, runValidators: true }
        );

        if (!Machcate) {
            return res.status(400).json({ message: 'MachineCategory not found' });
        }

        res.status(200).json({ message: 'MachineCategory updated successfully', data: Machcate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a MachineCategory
exports.deleteMachCate = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const Machcate = await Category.findByIdAndDelete(_id);

        if (!Machcate) {
            return res.status(400).json({ message: 'MachineCategory not found' });
        }

        res.status(200).json({ message: 'MachineCategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};