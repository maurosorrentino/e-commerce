const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {

    try {

        const errors = validationResult(req);

        // getting any errors that we might occur
        if(!errors.isEmpty()) {
    
            const error = new Error('validation failed');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
    
        };
    
        // getting inputs of user
        const email = req.body.email;
        const password = req.body.password;
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

        }

        next(err);

    }

};