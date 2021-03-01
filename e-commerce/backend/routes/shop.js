const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/shop', shopController.getItems);

module.exports = router;