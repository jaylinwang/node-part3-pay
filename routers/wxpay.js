'use strict';

const express = require('express');
const router = express.Router();

const wxpayCtrl = require('../controllers/wxpay');

router.get('/create',wxpayCtrl.toCreate);
router.post('/create',wxpayCtrl.create);

module.exports = router;