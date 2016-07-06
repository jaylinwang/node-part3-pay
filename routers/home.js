'use strict';

const express = require('express');
const router = express.Router();

const homeCtrl = require('../controllers/home');

router.get('/', homeCtrl.toIndex);

module.exports = router;