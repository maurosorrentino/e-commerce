const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getItems);

router.get('/shop', shopController.getItems);

router.patch('/reset-password/', shopController.requestResetPassword);

router.patch('/reset-password-form/:resetToken/:userId', shopController.resetPasswordPage);

// there are 2 middleware for showing the reviews because in the one where the user is logged in I send the userId so that we have a way to show the user the button "remove review"
// if the review shown it's his
router.get('/view-item-in/:itemId', shopController.viewItemLoggedIn);
router.get('/view-item-out/:itemId', shopController.viewItemLoggedOut);

// routes that loops all the reviews of the item (2 of them in otder to pass the user id if logged in so that we can show the button remove review to the right user)
router.get('/view-review/:itemId', shopController.viewReview);

// route that shows all the stats of the reviews for the item
router.get('/review-stats/:itemId', shopController.getReviewStats);

// saving the user email into db list when clicking on button "email me when available" when logged in
router.put('/email-me-item/:itemId', shopController.itemAvailableAgainLoggedIn);

// saving the user email into db list when clicking on button "email me when available" when logged out
router.put('/email-me-item-out/:itemId', shopController.itemAvailableAgainLoggedOut);

module.exports = router;