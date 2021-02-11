const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user')

const router = express.Router();

router.put('/signup', [

    body('email').isEmail(),

    body('password').trim().isLength({ min: 5 }),

    body('name').not().isEmpty()

], authController.signup);

module.exports = router;