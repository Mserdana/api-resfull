const  mongoose = require('mongoose');
const deliverySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId:{type:mongoose.Schema.Types.ObjectId,ref:'Order',required:true },
    adminId:{type:mongoose.Schema.Types.ObjectId,ref:'Admin',required:true },
    phoneNumber:{type:String,required:true, match:/^\+?([0-9]{3})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/
},
  });

module.exports = mongoose.model('Delivery',deliverySchema);