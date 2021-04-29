const mongoose = require('mongoose');
const { transport } = require('../mail/mail');

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

module.exports = mongoose.model('ItemAvailableAgainUser', ItemAvailableAgainUserSchema);