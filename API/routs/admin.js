const express = require('express');
const router = express.Router();
const adminrController = require('../controller/adminControllers');
const checkAuth = require('../middleweare/check-auth');


 router.post('/signUp',adminrController.signUpAdmin);
 router.post('/logIn',adminrController.LogInAdmin);
 router.get('/getAllUsers',checkAuth,adminrController.getAllUsers);
 router.get('/:adminId',checkAuth,adminrController.getAdminById);
 router.get('/getAdmins',adminrController.getAllAdmins);
 router.get('/getUser/:userId',checkAuth,adminrController.getUsersById);
 router.delete('/:adminId',checkAuth,adminrController.deleteAdmin);
  router.patch('/:adminId',adminrController.updateById);

module.exports=router;