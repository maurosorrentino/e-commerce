const User = require('../models/user');
const Item = require('../models/item');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// signup controller
exports.signup = async (req, res, next) => {

    try {
    
        // getting inputs of user
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const name = req.body.name;

        const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        
        // checking if email is valid with regex
        if(!email.match(emailRegex)) {

            return res.status(422).json({ message: 'Invalid email' });

        }

        // checking if there is already an user with the same email
        const userExists = await User.findOne({ email });

        // if user already exists we throw an error
        if(userExists) {

            return res.status(409).json({ message: `user ${email} already exists` });

        }

        // checking if the user wrote the password requested (double check so that we do not need to send a "change password" email)
        if(password !== confirmPassword) {

            return res.status(403).json({ message: 'passwords do not match' });

        }

        // checking if the name is empty
        if(name.length === 0) {

            return res.status(422).json({ message: 'please enter your name' });

        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating user with hashed password into the db
        const user = new User({

            name,
            email,
            password: hashedPassword,
            isAdmin: false,

            cart: {

                items: []

            }

        });

        // saving user and sending a response
        const savedUser = await user.save();

        return res.status(201).json({ message: 'user created, please log in' });

    } catch (err) {
        
        if(!err.statusCode) {

            err.statusCode = 500;
            console.log(err);

        }

        console.log(err);

    }

};

// login controller
exports.login = async (req, res, next) => {

    try { 

        // getting inputs of the user
        const email = req.body.email;
        const password = req.body.password;

        // finding the account with the email provided
        const user = await User.findOne({ email });

        // if there is no account we throw an error
        if(!user) {

            return res.status(404).json({ message: `There is no account into our database with this email: ${email}` });

        }

        // checking if the password matches the one that we have into our database
        const isEqual = await bcrypt.compare(password, user.password);

        // if passwords do not match we throw an error
        if(!isEqual) {

            return res.status(401).json({ message: 'invalid password, please try again' });

        }

        const userId = user._id.toString();

        // signing a token
        const token = jwt.sign({

            email,
            userId,

        }, process.env.TOKEN_SECRET, { expiresIn: '8760h' }); // remember to change it!!!

        // for navigation on the client side (I use the httpOnly false cookie for authentication)
        const weakToken = jwt.sign({}, process.env.WEAK_TOKEN_SECRET, { expiresIn: '8760h' }); // change it!!!

        // if password and email matches we will authenticate by creating a session and storing the tokens into the cookies
        await User.findById(userId)

            .then(() => {
        
                // assigning into the session isAuth for auth purposes and all the info of the user
                req.session.isAuth = true;
                req.session.user = user;

                // token into cookie
                res.cookie('token', token, { maxAge: 3600000 * 24 * 365, httpOnly: true, path: '/' }); // remember to change it!!!!
                
                // navigation on the client side
                res.cookie('authCookie', weakToken, {maxAge: 3600000 * 24 * 365, httpOnly: false, path: '/' }); // change it!!!

                // saving the session
                req.session.save(err => console.log(err));

            })

            .catch(err => next(err));

        return res.status(200).json({ message: 'successful login' });

    } catch (err) {

        if(!err.statusCode) {

            err.statusCode = 500;
            console.log(err);

        }

        console.log(err);

    }

};

exports.createItem = async (req, res, next) => {

    try {

        // verifying token from httpOnly true cookie
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET);

        // verifying weak token (httpOnly: false)
        const weakToken = req.cookies.authCookie;
        jwt.verify(weakToken, process.env.WEAK_TOKEN_SECRET);

        // if user has no session we throw an error
        if(!req.session.isAuth) {

            return res.status(401).json({ message: 'You cannot take this action, please login' });

        }

        // getting inputs of user
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const image = req.body.image;

        // getting the id of the user so that we can assign it to the item
        const userId = req.session.user._id;
 
        // if title is less than 3 characters we throw an error
        if(title.length < 3) {

            return res.status(422).json({ message: 'Title needs to be at least 3 characters' });

        };

        // if price is equal or less than 0 we throw an error
        if(price <= 0) {

            return res.status(422).json({ message: 'Price cannot be less or equal than 0' });

        };
 
        // if there is no image we throw an error
        if(!image) {
            
            return res.status(404).json({ message: 'you need to upload an image' });

        };  

        // if description is less than 5 characters we throw an error
        if(description.length < 5) {

            return res.status(422).json({ message: 'Description needs to be at least 5 characters' });

        };

 
        // if we pass all these steps (so there is no error) we create the item into the db
        const item = new Item({

            title,
            description,
            price,
            image,
            userId,

        });

        // saving the item and sending res
        const itemSave = await item.save();

        return res.status(200).json({ message: 'item was created', item: itemSave });


    } catch (err) {

        if(!err.statusCode) {

            err.statusCode = 500;
            console.log(err);

        }

        console.log(err);

    }

};

exports.logout = (req, res, next) => {

    req.session.destroy()

        .then(() => {

            res.clearCookie('token');
            res.clearCookie('authCookie');
            // res.clearCookie('connect.sid');

        })

        .catch(err => console.log(err))

};

