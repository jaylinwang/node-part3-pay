'use strict';

const express = require('express');
const router = express.Router();

const wxpayCtrl = require('../controllers/wxpay');

router.get('/wap', wxpayCtrl.toWapSubmit);
router.post('/wap', wxpayCtrl.wapSubmit);

module.exports = router;