const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

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

        next(err);

    }

};

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

        // if we have a matching password we assign a token
        const token = jwt.sign({

            email: user.email,
            userId: user._id.toString(),

        }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ token, userId: user._id.toString() });

    } catch (err) {

        if(!err.statusCode) {

            err.statusCode = 500;

        };

        next(err);

    }

};