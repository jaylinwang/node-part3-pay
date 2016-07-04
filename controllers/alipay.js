'use strict';

const logger = require('../utils/logger');
const ALIpay = require('../proxy/ALIpay');

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
exports.doNotify = function(req, res) {
    res.send('ok');
};

exports.doReturn = function(req,res){
    res.render('return ok');
};