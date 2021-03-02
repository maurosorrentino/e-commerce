const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

// signup route with validation
router.put('/signup', [

    body('email').isEmail(),

    body('password').trim().isLength({ min: 5 }),

    body('name').not().isEmpty()

], authController.signup);

// login route (validation is into the controller so that I don't need to write more code on the client side in order to show the user what's wrong)
router.post('/login', authController.login);

// create item route (validation is into the controller so that I don't need to write more code on the client side in order to show the user what's wrong)
router.put('/sell', authController.createItem);

module.exports = router;