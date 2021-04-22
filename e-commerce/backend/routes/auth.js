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

// logout route
router.delete('/logout', authController.logout);

// add to cart route
router.patch('/add-to-cart/:itemId', authController.addToCart);

// cart page
router.get('/cart', authController.cartPage);

// remove from cart path
router.patch('/remove-from-cart/:itemId', authController.removeFromCart);

// list of items that user created path
router.get('/my-items', authController.myItems);

// edit item path
router.patch('/edit-item/:itemId', authController.editItem);

// remove item from db path
router.delete('/remove-item/:itemId', authController.removeItem);

router.post('/create-checkout-session', authController.checkout);

router.post('/auth/success', authController.success);

module.exports = router;