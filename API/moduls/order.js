const  mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book_key:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true },
    quantity:{type:Number,default:1},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true },
    address:{type:String , required:true}


});

module.exports = mongoose.model('Order',orderSchema);