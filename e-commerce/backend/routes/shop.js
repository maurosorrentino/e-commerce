const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/shop', shopController.getItems);

router.patch('/reset-password/', shopController.requestResetPassword);

router.patch('/reset-password-form/:resetToken/:userId', shopController.resetPasswordPage);

router.get('/view-item/:itemId', shopController.viewItem);

// route that loops all the reviews of the item
router.get('/view-review/:itemId', shopController.viewReview);

// route that shows all the stats of the reviews for the item
router.get('/review-stats/:itemId', shopController.getReviewStats);

// saving the user email into db list when clicking on button "email me when available" when logged in
router.put('/email-me-item/:itemId', shopController.itemAvailableAgainLoggedIn);

// saving the user email into db list when clicking on button "email me when available" when logged out
router.put('/email-me-item-out/:itemId', shopController.itemAvailableAgainLoggedOut);

module.exports = router;