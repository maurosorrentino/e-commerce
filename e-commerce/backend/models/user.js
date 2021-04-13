const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {

        type: String,
        required: true,

    },

    email: {

        type: String,
        required: true,

    },

    password: {

        type: String,
        required: true,

    },

    isAdmin: {

        type: Boolean,
        required: true,

    },

    resetToken: {

        type: String,
        required: false

    },

    resetTokenExpires: {

        type: Date,
        required: false,

    },

    cart: {

        items: [

            {
            
            itemId: {
                
                type: Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            
            },
            
            quantity: { type: Number, required: true },

            title: { type: String, required: true },

            price: { type: Number, required: true },
          
            },

        ]
      }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);