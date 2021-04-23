const  mongoose = require('mongoose');
const cardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orders: {
        type: mongoose.Schema.Types.ObjectId, red:'Order',
        required: false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, red:'User',
        required: false
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