const express = require('express');
const router = express.Router();
const deliveryController = require('../controller/deliveryController');
const checkAuth = require('../middleweare/check-auth');

router.post('/',checkAuth,deliveryController.add_Delivery);
router.get('/:id',deliveryController.deliveryId);
router.patch('/:deliveryId',checkAuth,deliveryController.update_delivery);
router.delete('/:deliveryId',checkAuth,deliveryController.delete_delivery);
module.exports=router;