'use strict';

const ALIpay = require('../proxy/ALIPay');
const dateformat = require('dateformat');
const userCfg = require('../configs/user');
const sign = require('../utils/sign');
const logger = require('../utils/logger');

/**
 * web下单首页
 */
exports.toWebSubmit = function(req, res) {
    let orderNo = new Date().getTime();
    res.render('alipay/web/index', {
        orderNo: orderNo
    });
};

/**
 * web提交订单数据
 */
exports.webSubmit = function(req, res) {
    let orderInfo = req.body;
    ALIpay.submitOrderFromWeb(orderInfo).then(function(html) {
        res.send(html);
    });
};

/**
 * 跳转至支付宝退款
 */
exports.toRefundSubmit = function(req, res) {
    let batchNo = dateformat(new Date(), 'yyyymmdd') + new Date().getTime();
    res.render('alipay/refund/index', {
        batchNo: batchNo
    });
};

/**
 * 跳转至支付宝退款
 */
exports.refundSubmit = function(req, res) {
    let refundInfo = req.body;
    ALIpay.refundFastpay(refundInfo).then(function(html) {
        res.send(html);
    });
};


/**
 * wap下单首页
 */
exports.toWapSubmit = function(req, res) {
    let orderNo = new Date().getTime();
    res.render('alipay/wap/index', {
        orderNo: orderNo
    });
};

/**
 * wap提交订单数据
 */
exports.wapSubmit = function(req, res) {
    let orderInfo = req.body;
    ALIpay.submitOrderFromWap(orderInfo).then(function(html) {
        res.send(html);
    });
};

/**
 * 响应wap端回调信息
 */
exports.doWapNotify = function(req) {
    let notifyData = req.body;
    let result = {};
    if (sign.verify(notifyData, userCfg.alipay.partner_key, notifyData.sign)) {
        result = notifyData;
        logger.info({
            refundResult: result
        }, 'wap支付结果');
    } else {
        logger.error('验证签名错误');
    }
};

/**
 * 响应web端回调信息
 */
exports.doWebNotify = function(req) {
    let notifyData = req.body;
    let result = {};
    if (sign.verify(notifyData, userCfg.alipay.partner_key, notifyData.sign)) {
        result = notifyData;
        logger.info({
            refundResult: result
        }, 'web支付结');
    } else {
        logger.error('验证签名错误');
    }
};

/**
 * 退款回调
 */
exports.doRefundNotify = function(req) {
    let notifyData = req.body;
    let result = {};
    if (sign.verify(notifyData, userCfg.alipay.partner_key, notifyData.sign)) {
        result = notifyData;
        logger.info({
            refundResult: result
        }, '退款结果');
    } else {
        logger.error('验证签名错误');
    }
};