const express = require('express');
const router = express.Router();
const adminrController = require('../controller/adminControllers');
const checkAuth = require('../middleweare/check-auth');


 router.post('/signUp',adminrController.signUpAdmin);
 router.post('/logIn',adminrController.LogInAdmin);
 router.get('/getAllUsers',adminrController.getAllUsers);
 router.get('/:adminId',adminrController.getAdminById);
 router.get('/getAdmins',adminrController.getAllAdmins);
 router.get('/getUser/:userId',adminrController.getUsersById);
 router.delete('/:adminId',adminrController.deleteAdmin);
  router.patch('/:adminId',adminrController.updateById);

module.exports=router;