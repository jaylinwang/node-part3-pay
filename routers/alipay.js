'use strict';

const express = require('express');
const router = express.Router();

const alipayCtrl = require('../controllers/alipay');

router.get('/web', alipayCtrl.toWebSubmit);
router.post('/web', alipayCtrl.webSubmit);

router.get('/wap', alipayCtrl.toWapSubmit);
router.post('/wap', alipayCtrl.wapSubmit);

module.exports = router;