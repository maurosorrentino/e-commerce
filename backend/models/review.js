const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    itemId: {

        type: Schema.Types.ObjectId,
        ref:"Item",
        required: true,

    },

    userId: {

        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,

    },

    rating: {

        type: Number,
        required: true,

    },

    text: {

        type: String,
        required: false,

    }

}, { timestamps: true });

module.exports = mongoose.model('review', reviewSchema);