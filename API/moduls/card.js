const  mongoose = require('mongoose');
const cardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: {
        type: mongoose.Schema.Types.ObjectId, red:'Order',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, red:'User',
        required: true
    },
    modifiedOn: {
        type: Date,
        default: Date.now
      },
      active: {
        type: Boolean,
        default: true
      },
  

});

module.exports = mongoose.model('Card',cardSchema);

/*

*/