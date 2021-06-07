const express = require('express');

const authController = require('../controllers/auth');
const isAuth = require('../isAuth/isAuth');

const router = express.Router();

// signup routes with validation
router.put('/api/signup', authController.signup);
router.patch('/api/verify-account/:tokenVerifyEmail/:userId', authController.verifySignup);

// login route (validation is into the controller so that I don't need to write more code on the client side in order to show the user what's wrong)
router.post('/api/login', authController.login);

// create item route (validation is into the controller so that I don't need to write more code on the client side in order to show the user what's wrong)
router.put('/api/sell', isAuth.isAuth, authController.createItem);

// logout route
router.delete('/api/logout', authController.logout);

// add to cart route
router.patch('/api/add-to-cart/:itemId', isAuth.isAuth, authController.addToCart);

// cart page
router.get('/api/cart', isAuth.isAuth, authController.cartPage);

// remove from cart path
router.patch('/api/remove-from-cart/:itemId', isAuth.isAuth, authController.removeFromCart);

// list of items that user created path
router.get('/api/my-items', authController.myItems);

// edit item path
router.patch('/api/edit-item/:itemId', isAuth.isAuth, authController.editItem);

// remove item from db path
router.delete('/api/remove-item/:itemId', isAuth.isAuth, authController.removeItem);

// stripe routes
router.post('/api/create-checkout-session', isAuth.isAuth, authController.checkout);
router.post('/api/success', authController.success);

// order route
router.get('/api/orders', authController.orders);

// review route
router.put('/api/write-review/:itemId', isAuth.isAuth, authController.writeReview);

// remove review route
router.delete('/api/remove-review/:reviewId', isAuth.isAuth, authController.removeReview);

// change details route
router.patch('/api/change-details', isAuth.isAuth, authController.changeDetails);

router.get('/api/payouts', authController.getPayouts);

// showing current iban
router.get('/api/current-iban', authController.currentIban);

// saving new iban
router.put('/api/save-new-iban', isAuth.isAuth, authController.saveNewIban);

module.exports = router;