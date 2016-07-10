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
    //2016071021001004700254981079^0.01^协商退款
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
 * 响应回调信息
 */
exports.doPayNotify = function(req, res) {
    res.send('ok');
};

/**
 * 支付调转
 */
exports.doPayReturn = function(req, res) {
    res.render('return ok');
};

/**
 * 退款回调
 */
exports.doRefundNotify = function(req, res) {
    let notifyData = req.query;
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