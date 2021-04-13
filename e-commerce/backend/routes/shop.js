const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/shop', shopController.getItems);

router.patch('/reset-password', shopController.requestResetPassword);

module.exports = router;