
const  mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     adminName:{
         type : String , requied: true
     },
     adminPassword:{
         type: String , requied: true
     }
     
});

module.exports = mongoose.model('Admin',adminSchema);