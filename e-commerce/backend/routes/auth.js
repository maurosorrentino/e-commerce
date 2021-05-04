const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// signup route with validation
router.put('/signup', authController.signup);

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

// stripe routes
router.post('/create-checkout-session', authController.checkout);
router.post('/success', authController.success);

// order route
router.get('/orders', authController.orders);

// review route
router.put('/write-review/:itemId', authController.writeReview);

// remove review route
router.delete('/remove-review/:reviewId', authController.removeReview);

// change details route
router.patch('/change-details', authController.changeDetails);

router.get('/payouts', authController.getPayouts);

module.exports = router;