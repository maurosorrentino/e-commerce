const User = require('../models/user');
const Item = require('../models/item');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// signup controller
exports.signup = async (req, res, next) => {

    try {

        // extracting validation errors
        const errors = validationResult(req);
    
        // getting inputs of user
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const name = req.body.name;

        // checking if there is already an user with the same email
        const userExists = await User.findOne({ email });

        // if user already exists we throw an error
        if(userExists) {

            const error = new Error(`user ${email} already exists`);
            error.data = errors.array();
            error.statusCode = 409;
            throw error;

        }

        // checking if the user wrote the password requested (double check so that we do not need to send a "change password" email)
        if(password !== confirmPassword) {

            const error = new Error('passwords do not match');
            error.data = errors.array();
            error.statusCode = 403;
            throw error;

        }

        // getting any other errors that we might occur (name and email)
        if(!errors.isEmpty()) {
    
            const error = new Error('validation failed, please check email and name');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
    
        };

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating user
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
        return res.status(201).json({ message: 'user created', userId: savedUser._id.toString() });

    } catch (err) {

        // catching errors and giving a status code of 500 if it is not set
        if(!err.statusCode) {

            err.statusCode = 500;

        };

        // going to error middleware in case of errors
        next(err);

    }

};

// login controller
exports.login = async (req, res, next) => {

    try { 

        // extracting validation errors
        const errors = validationResult(req);

        // getting inputs of the user
        const email = req.body.email;
        const password = req.body.password;

        // finding the account with the email provided
        const user = await User.findOne({ email });

        // if there is no account we throw an error
        if(!user) {

            const error = new Error(`There is no account into our database with this email: ${email}`);
            error.data = errors.array();
            error.statusCode = 404;
            throw error;

        }

        // checking if the password matchees the one that we have into our database
        const isEqual = await bcrypt.compare(password, user.password);

        // if passwords do not match we throw an error
        if(!isEqual) {

            const error = new Error('invalid password, please try again');
            error.data = errors.array();
            error.statusCode = 401;
            throw error;

        }

        const userId = user._id;

        // if password and email matches we will authenticate
        await User.findById(userId)

            .then(() => {

                req.session.isAuth = true;
                req.session.user = user;
                
                // saving the session
                req.session.save(err => next(err));

            })

            .catch(err => next(err));

        res.status(200).json({ message: 'successful login' });

    } catch (err) {

        // if status code is undefined we set 500
        if(!err.statusCode) {

            err.statusCode = 500;

        };

        // going to error middleware in case of errors
        next(err);

    }

};

exports.createItem = async (req, res, next) => {

    try {

        // extracting validation errors
        const errors = validationResult(req);

        console.log(req.session);

        // if user is not logged in we throw an error
        if(!req.session.isAuth) {

            const error = new Error('You cannot take this action, please login');
            error.data = errors.array();
            error.statusCode = 401;
            throw error;

        }

        // getting inputs of user
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        // const image = req.file.path.replace("\\", "/");

        // getting the id of the user so that we can assign it to the item
        const userId = req.session.user._id;
 
        // if title is less than 3 characters we throw an error
        if(title.length < 3) {

            const error = new Error('Title needs to be at least 3 characters');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;

        };

        // if description is less than 5 characters we throw an error
        if(description.length < 5) {

            const error = new Error('Description needs to be at least 5 characters');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;

        };

        // if price is equal or less than 0 we throw an error
        if(price <= 0) {

            const error = new Error('Price cannot be less or equal to 0');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;

        };
/* 
        if(!image) {

            const error = new Error('An image needs to be uploaded');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;

        }; */

        // if we pass all these steps (so there is no error) we create the item
        const item = new Item({

            title,
            description,
            price,
            //image,
            userId,

        });

        // saving the file
        const itemSave = await item.save();

        res.status(200).json({ message: 'item was created', item: itemSave });


    } catch (err) {

        // if status code is undefined we set 500
        if(!err.statusCode) {

            err.statusCode = 500;

        };

        // going to error middleware in case of errors
        next(err);

    }

};