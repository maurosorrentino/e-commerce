const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/shop', shopController.getItems);

router.patch('/reset-password/', shopController.requestResetPassword);

router.patch('/reset-password-form/:resetToken/:userId', shopController.resetPasswordPage);

router.get('/view-item/:itemId', shopController.viewItem);

module.exports = router;