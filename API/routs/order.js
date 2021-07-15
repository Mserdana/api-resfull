const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const checkAuth = require('../middleweare/check-auth');

router.get('/',orderController.order_get_all);

router.post('/',orderController.add_order);

router.get('/:orderID',orderController.order_get_by_id);
 
router.patch('/:orderID',orderController.petch_order_by_id);
   
router.delete('/:orderID',orderController.delete_order_by_id);


module.exports=router;

