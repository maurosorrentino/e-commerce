const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/api/shop', shopController.getItems);

router.patch('/api/reset-password', shopController.requestResetPassword);

router.patch('/api/reset-password-form/:resetToken/:userId', shopController.resetPasswordPage);

// there are 2 middleware for showing the reviews because in the one where the user is logged in I send the userId so that we have a way to show the user the button "remove review"
// if the review shown it's his
router.get('/api/view-item-in/:itemId', shopController.viewItemLoggedIn);
router.get('/api/view-item-out/:itemId', shopController.viewItemLoggedOut);

// routes that loops all the reviews of the item (2 of them in otder to pass the user id if logged in so that we can show the button remove review to the right user)
router.get('/api/view-review/:itemId', shopController.viewReview);

// route that shows all the stats of the reviews for the item
router.get('/api/review-stats/:itemId', shopController.getReviewStats);

// saving the user email into db list when clicking on button "email me when available" when logged in
router.put('/api/email-me-item/:itemId', shopController.itemAvailableAgainLoggedIn);

// saving the user email into db list when clicking on button "email me when available" when logged out
router.put('/api/email-me-item-out/:itemId', shopController.itemAvailableAgainLoggedOut);

module.exports = router;