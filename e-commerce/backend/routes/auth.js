const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user')

const router = express.Router();

router.put('/signup', [

    body('email')

        .isEmail()
        .custom((email, { req }) => {

            return User.findOne({ email })

                .then(user => {

                    if(user) {

                        return Promise.reject('user already exists');

                    }

                });

        }),

    body('password').trim().isLength({ min: 5 }).withMessage('password is too short!'),

    body('name').not().isEmpty().withMessage('please include your name')

], authController.signup);

module.exports = router;