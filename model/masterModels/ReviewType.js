const  mongoose = require('mongoose');
const ReviewTypeSchema = new mongoose.Schema({

    
    reviewTypeName:{
        type:String,
        trim:true
    },
    reviewTypeCode:{
        type:String,
        trim:true
    },
    isActive:{
        type:Boolean,
    },
    // reviewId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     Ref: 'Review',
    //     required: true
    // },
    // notes:{
    //     type:String,
    //     trim:true
    // }


},{timestamps:true})
const ReviewTypeModel = mongoose.model('ReviewType',ReviewTypeSchema)
module.exports=ReviewTypeModel