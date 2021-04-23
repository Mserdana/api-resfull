const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const checkAuth = require('../middleweare/check-auth');

router.get('/',orderController.order_get_all);

router.post('/',checkAuth,orderController.add_order);

router.get('/:orderID',orderController.order_get_by_id);
 
router.patch('/:orderID',checkAuth,orderController.petch_order_by_id);
   
router.delete('/:orderID',checkAuth,orderController.delete_order_by_id);


module.exports=router;

