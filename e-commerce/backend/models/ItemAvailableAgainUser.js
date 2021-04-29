const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemAvailableAgainUserSchema = new Schema({

    itemId: {

        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,

    },

    userEmail: {

        type: String,
        required: true,

    }

}, {timestamps: true});

module.exports = mongoose.model('Item_Available_Again_User', ItemAvailableAgainUserSchema);