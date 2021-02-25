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

// login route
router.post('/login', authController.login);

// create item route
router.post('/sell', authController.createItem);

module.exports = router;