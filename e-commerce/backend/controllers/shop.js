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
        const resetToken = crypto.randomBytes(32).toString('hex');

        // creating a hashed token with 1 hour expire date so that we can save it into the db for this user
        const hashedResetToken = await bcrypt.hash(resetToken, 12);
        const resetTokenExpires = Date.now() + 3600000; // 1 hour
        
        // assigning hashed token and expire date to the user into the db
        user.resetToken = hashedResetToken;
        user.resetTokenExpires = resetTokenExpires;
        await user.save(); 

        // this line is in order to avoid a 404 page in case the token gets generated with a /
        const encodedToken = encodeURIComponent(resetToken);

        // sending plain token encoded to the user so that later we can verify it
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

        // decoding the token that we sent to the user and getting the id from url so that we can find this user
        const resetToken = decodeURIComponent(req.params.resetToken);
        const userId = req.params.userId;
    
        // finding user
        const user = await User.findById(userId);

        if(!user) {

            return res.status(404).json({ message: 'Sorry, We Could Not Find An Account, Please Request Another Password Reset. You Are Being Redirected To The Page'})

        }
        
        // this line makes sure that the token that we sent to the user is valid
        const isValid = await bcrypt.compare(resetToken, user.resetToken);

        // if token is not valid or it expired we throw an error message
        if(!isValid || Date.now() > user.resetTokenExpires) {
    
            return res.status(401).json({ message: 'Forbidden! Please Request Another Password Reset, You Are Being Redirected To Reset Password Page' });
    
        }
    
        // getting input of the user
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
    
        // validation password.length >= 5
        if(password.length < 5) {
    
            return res.status(422).json({ message: 'Password Needs To Be At Least 5 characters'});
    
        }
    
        if(password !== confirmPassword) {
    
            return res.status(403).json({ message: 'Passwords Do Not Match!' });
    
        }
    
        // hashing the new password and saving it into the db for this user
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