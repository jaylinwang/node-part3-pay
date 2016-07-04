'use strict';

const logger = require('../utils/logger');
const WXPay = require('../proxy/WXPay');

/**
 * 跳转至创建订单页面
 */
exports.toCreate = function(req, res) {
    let orderNo = new Date().getTime();
    res.render('wxpay/create', {
        orderNo: orderNo
    });
};

/**
 * 提交订单
 */
exports.create = function(req, res) {
    let orderInfo = req.body;
    WXPay.createOrder(orderInfo).then(function(body) {
        logger.info({
            body: body
        }, 'unifiedorder result');
        res.json(body);
    });
};