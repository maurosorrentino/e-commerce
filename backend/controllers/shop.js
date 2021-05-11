const Item = require('../models/item');
const User = require('../models/user');
const Review = require('../models/review');
const ItemAvailableAgainUser = require('../models/ItemAvailableAgainUser');

const { transport } = require('../mail/mail');

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const url = require('url');

require('dotenv').config();

exports.getItems = async (req, res) => {

    // pagination is handled on the client side so from here I only need the number of the items
    let totalItems;

    try {

        // counting the items so that we can send it on the client side
        totalItems = await Item.find().countDocuments();

        // finding the items
        const items = await Item.find();
 
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
        const link = url.format({

            protocol: 'https',
            hostname: 'e-commerce-my-shop',
            pathname: `reset-password-form/${encodedToken}/${user._id}`,

        });

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

// there are 2 middleware for showing the reviews because in the one where the user is logged in I send the userId so that we have a way to show the user the button "remove review"
// if the review shown it's his
exports.viewItemLoggedOut = async (req, res) => {

    try {

        // finding the item to get and sending all the info that we need into res
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId);

        const title = item.title;
        const description = item.description;
        const image = item.image;
        const price = item.price;
        const stock = item.stock;

        return res.status(200).json({ message: 'item fetched', title, description, image, price, stock, itemId });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

}

// there are 2 middleware for showing the reviews because in the one where the user is logged in I send the userId so that we have a way to show the user the button "remove review"
// if the review shown it's his
exports.viewItemLoggedIn = async (req, res) => {

    try {

        // finding the item to get and sending all the info that we need into res
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId);

        const title = item.title;
        const description = item.description;
        const image = item.image;
        const price = item.price;
        const stock = item.stock;

        const userId = req.session.user._id;

        return res.status(200).json({ message: 'item fetched', title, description, image, price, stock, itemId, userId });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

}

exports.viewReview = async (req, res) => {

    try {

        const itemId = req.params.itemId;
        const reviews = await Review.find({ itemId });

        return res.status(200).json({ reviews, message: 'reviews fetched' });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

}

exports.getReviewStats = async (req, res) => {

    try {

        // getting itemId so that we can find all the reviews of this item
        const itemId = req.params.itemId;

        // finding reviews of this item
        const reviews = await Review.find({ itemId });

        // counting all the reviews that we have on this item
        const totalReviews = await Review.find({ itemId }).countDocuments();
        
        // empty arrays so that we can push all the ratings, count them and send them to the UI
        const total5stars = [];
        const total4stars = [];
        const total3stars = [];
        const total2stars = [];
        const total1star = [];

        // mapping the reviews of this item so that we can push the ratings into the right array and count them
        reviews.map(review => {

            if(review.rating === 1) {

                total1star.push(review.rating);

            };

            if(review.rating === 2) {

                total2stars.push(review.rating);

            };

            if(review.rating === 3) {

                total3stars.push(review.rating);

            };

            if(review.rating === 4) {

                total4stars.push(review.rating);

            };

            if(review.rating === 5) {

                total5stars.push(review.rating);

            };

        });

        // counting reviews so that we know how many are with how many stars
        const total5starsLength = total5stars.length;
        const total4starsLength = total4stars.length;
        const total3starsLength = total3stars.length;
        const total2starsLength = total2stars.length
        const total1starLength = total1star.length;

        // adding between them so that we can get an average
        const reducer = (a, b) => a + b;

        const stars5 = total5stars.reduce(reducer, 0);
        const stars4 = total4stars.reduce(reducer, 0);
        const stars3 = total3stars.reduce(reducer, 0);
        const stars2 = total2stars.reduce(reducer, 0);
        const star1 = total1star.reduce(reducer, 0);

        // getting the average of the reviews
        const averageReviews = (star1 + stars2 + stars3 + stars4 + stars5) / totalReviews;

        return res.status(200).json({ averageReviews, total5starsLength, total4starsLength, total3starsLength, total2starsLength, total1starLength, totalReviews });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

// if statemente wasn't working with !userId so I decided to put 2 middlewares for logged and not logged users
exports.itemAvailableAgainLoggedIn = async (req, res) => {

    try {

        // getting the user id and finding the user so that we can save the info in our db in order to send them an email when product will be available again
        const userId = req.session.user._id;
        const user = await User.findById(userId);

        // item id that we will save into this collection
        const itemId = req.params.itemId;

        // if the user already requested a follow up email notification we say so to him/her
        const alreadyExists = await ItemAvailableAgainUser.findOne({ itemId, userEmail: user.email });

        if(alreadyExists) {

            return res.status(200).json({ message: 'you already requested a follow up email notification for this item' });

        }

        // saving data into collection
        const itemAvailableAgainUser = new ItemAvailableAgainUser({

            itemId,
            userEmail: user.email,

        });

        await itemAvailableAgainUser.save();

        return res.status(200).json({ message: 'Thank You, We Will Email You As Soon As We Have News On This Item', email: user.email }); 

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }
    
};

exports.itemAvailableAgainLoggedOut = async (req, res) => {

    // data that we need to save into collection
    const itemId = req.params.itemId;
    const email = req.body.email;
    
    // if the user already requested a follow up email notification we say so to him/her
    const alreadyExists = await ItemAvailableAgainUser.findOne({ itemId, userEmail: email });

    if(alreadyExists) {

        return res.status(200).json({ message: 'you already requested a follow up email notification for this item' });

    }

    // saving data into collection
    const itemAvailableAgainUser = new ItemAvailableAgainUser({

        itemId,
        userEmail: email,

    });

    await itemAvailableAgainUser.save();

    return res.status(200).json({ message: 'Thank You, We Will Email You As Soon As We Have News On This Item' });
    
}