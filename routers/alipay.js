'use strict';

const express = require('express');
const router = express.Router();

const alipayCtrl = require('../controllers/alipay');

router.get('/web', alipayCtrl.toWebSubmit);
router.post('/web', alipayCtrl.webSubmit);
router.post('/web/notify', alipayCtrl.doWebNotify);

router.get('/wap', alipayCtrl.toWapSubmit);
router.post('/wap', alipayCtrl.wapSubmit);
router.post('/wap/notify', alipayCtrl.doWapNotify);

router.get('/refund', alipayCtrl.toRefundSubmit);
router.post('/refund', alipayCtrl.refundSubmit);
router.post('/refund/notify', alipayCtrl.doRefundNotify);

module.exports = router;