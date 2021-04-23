const express = require('express');
const router = express.Router();
const cardController = require('../controller/CardController');


router.get('/',cardController.getCard);

module.exports=router;


