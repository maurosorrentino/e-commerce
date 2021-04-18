const Item = require('../models/item');
const User = require('../models/user');
const { transport } = require('../mail/mail');

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { urlencoded } = require('body-parser');

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

        // checking if user has valid tokens into the cookies, session cookie and also session. if so, we delete all of them
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

        console.log('token', hashedResetToken);

        const encodedToken = encodeURIComponent(user.resetToken);
        console.log('token encoded', encodedToken);

        const link = `http://localhost:3000/reset-password-form/${encodedToken}/${user._id}`;

        await transport.sendMail({

            from: 'sorrentino.mauro95@gmail.com',
            to: user.email,
            subject: 'Reset Password Requested',

            html: 
                
                `<h1>Hi ${user.name},</h1>
                <br>
                
                <p>Please Click On The Link Below In Order To Update Your Password</p>
                <br>

                <a href="${link}">Click Here To Reset Your Password</a>
            
                `,

        });

        res.status(200).json({ message: 'Password Reset Requested, Please Check Your Email' });
        
    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        };

    };

};

exports.resetPasswordPage = async (req, res, next) => {

    try {

        const resetToken = decodeURIComponent(req.params.resetToken);
        const userId = req.params.userId;
    
        const user = await User.findById(userId);
    
        console.log('reset token page decoded', resetToken);
        console.log('reset token page', user.resetToken);
        console.log(user.email);
        
        const isValid = await bcrypt.compare(resetToken, user.resetToken);
        console.log('is valid ', isValid);
    
        if(!isValid || Date.now() > user.resetTokenExpires) {
    
            return res.status(401).json({ message: 'forbidden' });
    
        }
    
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
    
        if(password.length < 5) {
    
            return res.status(422).json({ message: 'Password Needs To Be At Least 5 characters'});
    
        }
    
        if(password !== confirmPassword) {
    
            return res.status(403).json({ message: 'Passwords Do Not Match!' });
    
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        user.password = hashedPassword;
    
        await user.save();
    
        return res.status(200).json({ message: 'You Have Changed Your Password, You Are Being Readirected To The Login Page' });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};