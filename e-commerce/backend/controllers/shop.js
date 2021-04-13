const Item = require('../models/item');
const User = require('../models/user');

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

exports.getItems = async (req, res, next) => {

    // pagination is handled on the client side so from here I only need the number of the items
    let totalItems;

    try {

        // counting the items so that we can send it on the client side
        totalItems = await Item.find().countDocuments();

        // finding the items
        const items = await Item.find()
 
            // sending res with the items so that we can fetch it on the client side and the total number of the items
            res.status(200).json({

                message: 'fetched items',
                items,
                totalItems,

            });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.requestResetPassword = async (req, res, next) => {

    try {

        // getting the input of the user and finding it
        const email = req.body.email;
        const user = await User.findOne({ email });

        // if no user is found we throw a error message to the user
        if(!user) {

            return res.status(404).json({ message: `We Couldn't Find An Account With The Following Email: ${email}` });

        } 

        // checking if user has valid tokens into the cookies, session cookie and also session, if so, we delete all of them
        res.clearCookie('token');
        res.clearCookie('authCookie');
        res.clearCookie('connect.sid');
        req.session.destroy();

        // creating a new token for the user
        let resetToken = crypto.randomBytes(32).toString('hex');
        const hashedResetToken = await bcrypt.hash(resetToken, 12);
        const resetTokenExpires = Date.now() + 3600000; // 1 hour
        
        // assigning hashed token and expire date to the user into the db
        user.resetToken = hashedResetToken;
        user.resetTokenExpires = resetTokenExpires;
        await user.save();

        

        res.status(200).json({ message: 'Password Reset Requested, Please Check Your Email' });
        
    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        };

    };

};