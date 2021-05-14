const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// signup route with validation
router.put('/api/signup', authController.signup);

router.patch('/api/verify-account/:tokenVerifyEmail/:userId', authController.verifySignup);

// login route (validation is into the controller so that I don't need to write more code on the client side in order to show the user what's wrong)
router.post('/api/login', authController.login);

// create item route (validation is into the controller so that I don't need to write more code on the client side in order to show the user what's wrong)
router.put('/api/sell', authController.createItem);

// logout route
router.delete('/api/logout', authController.logout);

// add to cart route
router.patch('/api/add-to-cart/:itemId', authController.addToCart);

// cart page
router.get('/api/cart', authController.cartPage);

// remove from cart path
router.patch('/api/remove-from-cart/:itemId', authController.removeFromCart);

// list of items that user created path
router.get('/api/my-items', authController.myItems);

// edit item path
router.patch('/api/edit-item/:itemId', authController.editItem);

// remove item from db path
router.delete('/api/remove-item/:itemId', authController.removeItem);

// stripe routes
router.post('/api/create-checkout-session', authController.checkout);
router.post('/api/success', authController.success);

// order route
router.get('/api/orders', authController.orders);

// review route
router.put('/api/write-review/:itemId', authController.writeReview);

// remove review route
router.delete('/api/remove-review/:reviewId', authController.removeReview);

// change details route
router.patch('/api/change-details', authController.changeDetails);

router.get('/api/payouts', authController.getPayouts);

// showing current iban
router.get('/api/current-iban', authController.currentIban);

// saving new iban
router.put('/api/save-new-iban', authController.saveNewIban);

module.exports = router;