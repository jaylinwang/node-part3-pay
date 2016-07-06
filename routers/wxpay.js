'use strict';

const express = require('express');
const router = express.Router();

const wxpayCtrl = require('../controllers/wxpay');

router.get('/wap', wxpayCtrl.toWapSubmit);
router.post('/wap', wxpayCtrl.wapSubmit);

router.get('/web', wxpayCtrl.toWebSubmit);
router.post('/web', wxpayCtrl.webSubmit);

module.exports = router;