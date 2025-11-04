const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    countryCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
      isActive: {
      type: Boolean,
      default: true
    }
},
{timestamps: true }
) 
const Country = mongoose.model('Country',CountrySchema);

module.exports = Country;