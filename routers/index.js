'use strict';

const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/wxpay', require('./wxpay'));
router.use('/alipay', require('./alipay'));

module.exports = router;