const  mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const usersSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId
     ,
     password: {type: String,required:true,} ,
     email:{type :String,required:true,unique:true,match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
     firstName: {
        type:String,
        required:true
     },
     lastName: {
        type:String,
        required:true
     },
     createDate:{
        type:Date,
        default:Date.now(),
        
     },
      
     profileImage:{
         type:String,
         
        },
       phonenumper:
       {
          type:String,
          match:/^\+?([0-9]{3})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/
       } ,
       location:
       {
          type:String,
          
       } ,
       resetLink:{
          data:String,
          default:''
       },
       
  
},{timestamps:true});




/*
usersSchema.pre("save",  function (next) {
   var user = this;
  var SALT_FACTOR = 10;

   if (!this.isModified("password")) {
     return next();
   }
   bcrypt.genSalt(SALT_FACTOR , function(err,salt){
      if (err) return next(err);
      
      bcrypt.hash(user.password,salt,null,function(err,hash){
         if (err) return next(err);
         user.password=hash;
      })
   })
  
 });
 */

 module.exports = mongoose.model('User',usersSchema);