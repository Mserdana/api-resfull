const express = require('express');
const router = express.Router();
const cardController = require('../controller/CardController');


router.post('/',cardController.postCard);
router.get('/:cardId',cardController.getCardById);
router.patch('/:cardId',cardController.petch_card_by_id);
router.delete('/:cardId',cardController.deleteCardById);

module.exports=router;


