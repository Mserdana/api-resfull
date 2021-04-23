
const express = require('express');
const router = express.Router();
const User = require("../moduls/user");
const bcrypt =require('bcrypt');
const mongoose=require('mongoose');
const multer = require('multer');
const userController = require('../controller/UserController');
const checkAuth = require('../middleweare/check-auth');

const storage = multer.diskStorage({
    destination :'./upload/profileImages/',
    filename:function(req,file,cb){
        cb(null, `${new Date().toISOString().replace(/:/g, '-' ,/\s+/g, ' ')}${file.originalname}`);

    }
});

const filefilter = (req,file,cb)=>{
    if(file.mimtype ==='image/jpeg'||file.mimtype==='image/png'){
       cb(null,true);

   }else{  
       cb(null,false);

   }

};
const uploadImg = multer({
    storage: storage,limits:{
    fileSize:102*1014*5
   },
   filefilter:{
       filefilter
   }}).single('profileImage');


router.post('/signUp',uploadImg,userController.signIn);
router.post('/login',userController.logIn);
router.patch('/:userId',uploadImg,userController.updateById);
router.delete('/:userId',userController.deleteUser);
router.post('/forgetpassword',userController.forgetpassword);
router.post('/resetPassword',userController.resetPassword);

 module.exports=router;