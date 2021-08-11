const express = require('express');
const router = express.Router();
const cardController = require('../controller/CardController');


router.post('/',cardController.postCard);
router.get('get/:cardId',cardController.getCardById);
router.patch('/updated/:cardId',cardController.petch_card_by_id);
router.delete('/delete/:cardId',cardController.deleteCardById);

module.exports=router;
