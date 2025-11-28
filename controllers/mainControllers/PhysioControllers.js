const Physio = require('../../model/masterModels/Physio');
const mongoose = require('mongoose')


exports.createPhysio = async (req, res) => {
    try {
        const {
            physioName,
            physioAge,
            physioGenderId,
            physioContactNo,
            physioSpcl,
            physioQulifi,
            physioExp,
            physioPAN,
            physioAadhar,
            physioSalary,
            physioProbation,
            physioINCRDate,
            physioPetrolAlw,
            physioVehicleMTC,
            physioIncentive,
            isActive,
            physioNote,
            physioDescription,
             password,
            roleId,
        } = req.body;
  
    const lastPhysio = await Physio.findOne({}, {}, { sort: { 'createdAt': -1 } });
    let nextPhysioNumber = 1;
    
    if (lastPhysio && lastPhysio.physioCode) {
      const lastNumber = parseInt(lastPhysio.physioCode.replace('PHYSIO', ''));
      nextPhysioNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;
    }
    
    const physioCode = `PHYSIO${String(nextPhysioNumber).padStart(3, '0')}`;
    
        const newPhysio = new Physio({
            physioCode,
            physioAge,
            physioName,
            physioGenderId,
            physioContactNo,
            physioSpcl,
            physioQulifi,
            physioExp,
            physioPAN,
            physioAadhar,
            physioSalary,
            physioProbation,
            physioINCRDate,
            physioPetrolAlw,
            physioVehicleMTC,
            physioIncentive,
            isActive,
            physioNote,
            physioDescription,
            password,
            roleId

        });
        
        const savedPhysio = await newPhysio.save();
        res.status(201).json(savedPhysio);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Physio code already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPhysios = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;
        const skip = (page - 1) * limit;
        const {type}=req.body
        console.log(type,"type")
        const filter={}
        if(type===undefined){
          filter.isActive=true
        }
        console.log(filter,"filter")
        const physios = await Physio.find(filter) 
            .populate('physioGenderId').populate('roleId','RoleName')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalPhysios = await Physio.countDocuments({ isActive: true });

        res.status(200).json({
            totalPhysios,
            totalPages: Math.ceil(totalPhysios / limit),
            currentPage: page,
            physios
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPhysioById = async (req, res) => {
    try {
        
        const { _id } = req.body; 
        if (!_id) {
            return res.status(400).json({ message: 'Physio ID is required in the body.' });
        }

        const physio = await Physio.findById(_id)
            .populate('physioGenderId');

        if (!physio) {
            return res.status(404).json({ message: 'Physio not found' });
        }

        res.status(200).json(physio);

    } catch (error) {
        if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid Physio ID' });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.updatePhysio = async (req, res) => {
    try {
        
        const { _id, ...updateData } = req.body;
        
        if (!_id) {
            return res.status(400).json({ message: 'Physio ID is required in the body for updates.' });
        }

        const updatedPhysio = await Physio.findByIdAndUpdate(
            _id,
            updateData,
     
            { new: true, runValidators: true } 
        );

        if (!updatedPhysio) {
            return res.status(404).json({ message: 'Physio not found' });
        }

        res.status(200).json(updatedPhysio);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Physio code already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.deletePhysio = async (req, res) => {
    try {
        
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'Physio ID is required in the body.' });
        }

        // Soft delete
        const softDeletedPhysio = await Physio.findByIdAndUpdate(
            _id,
            { isActive: false },
            { new: true }
        );

        if (!softDeletedPhysio) {
            return res.status(404).json({ message: 'Physio not found' });
        }

        res.status(200).json({ message: 'Physio deactivated successfully' });

    } catch (error) {
        if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid Physio ID' });
        }
        res.status(500).json({ message: error.message });
    }
};




// LOGIN Physio
exports.loginPhysio = async (req, res) => {
  try {
    const { physioCode, password } = req.body;
console.log(physioCode, password ,"physioCode, password ")
    // 1. Reject if request is from mobile device
    const userAgent = req.headers["user-agent"] || "";
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    if (isMobile) {
      return res.status(403).json({ message: "Login from mobile devices is not allowed" });
    }

    // 2. Find employee by email
    const physio = await Physio.findOne({ physioCode: physioCode }).populate("roleId","RoleName")
    console.log(physio,"physio")
    if (!physio) {
      return res.status(404).json({ message: "Invalid Employee Code" });
    }

    // 4. Compare plain password (since not hashing yet)
    if (physio.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 5. Mark employee as logged in
    // physio.isCurrentlyLoggedIn = true;
    // await physio.save();

    // 6. Success
    res.status(200).json({
      message: "Login successful",
      physio: {
        _id: physio._id,
        physioName: physio.physioName,
        physioCode: physio.physioCode,
        role:physio.roleId.RoleName
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.logoutPhysio = async (req, res) => {
  try {
    const { physioCode } = req.body; // or get from token/session if you’re using auth

    // 1. Find employee
    const physio = await Physio.findOne({ email: email });
    if (!physio) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2. Check if already logged out
    if (!physio.isCurrentlyLoggedIn) {
      return res.status(400).json({ message: "physio is already logged out" });
    }

    // 3. Update login status
    physio.isCurrentlyLoggedIn = false;
    await physio.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

exports.logoutUser = async (_id) => {
  try {
    // Update lastActive or any other logout tracking if needed
    await Physio.findByIdAndUpdate(_id, { isCurrentlyLoggedIn: false });

  } catch (err) {
    console.error("❌ Error logging out user:", err.message);
  }
};

exports.checkLogin = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"]; // userId passed from frontend
    if (!userId) {
      return res.status(401).json({ message: "User ID missing" });
    }

    const user = await Physio.findById(userId);

    if (!user || !user.isCurrentlyLoggedIn) {
      return res.status(401).json({ message: "User not logged in" });
    }

    // ✅ User is valid and logged in
    req.user = user;
    next();
  } catch (err) {
    console.error("checkLogin error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
