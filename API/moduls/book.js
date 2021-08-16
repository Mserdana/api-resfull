
const  mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     title:{type:String , require:true,},
     descriptioin:{type: String,reuired:true},
     publishedDate: {type: Date, required:true,},
     pageCount: {type: String, required:true,},
     CreatedAt: {type: Date, default: Date.now},
     coverImageName:{type: String, required:false, },
     bookPrice:{type:Number , require:true,},
     type:{type:String,required:true,},
     pdfSrc:{type:String,required:false,},
     auther:{type:String,required:true,},
     Rate:{type:String,required:true,},
     isbn10:{type:String,},
     isbn13:{type:String},
});

module.exports = mongoose.model('Book',bookSchema);