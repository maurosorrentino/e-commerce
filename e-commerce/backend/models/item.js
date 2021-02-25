const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({

    title: {

        type: String,
        required: true,

    },

    description: {

        type: String,
        required: true,

    },

    price: {

        type: Number,
        required: true,

    },

    image: {

        type: String,
        required: false,

    },

    userId: {

        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },

}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);