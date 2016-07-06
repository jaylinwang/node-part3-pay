'use strict';

const logger = require('../utils/logger');
const WXPay = require('../proxy/WXPay');
const OAuth = require('wechat-oauth');
const QRCode = require('qrcode');

const wxpayCfg = require('../configs/wxpay');
const userCfg = require('../configs/user');
const client = new OAuth(userCfg.wxpay.appid, userCfg.wxpay.app_secret);

/**
 * 跳转至创建订单页面
 */
exports.toWapSubmit = function(req, res) {
    let originalUrl = req.originalUrl;
    let code = req.query.code;
    if (code) {
        res.redirect(client.getAuthorizeURL(originalUrl, 'test', 'snsapi_base'));
    } else {
        let orderNo = new Date().getTime();
        client.getAccessToken(code, function(err, result) {
            let openid = result.data.openid;
            if (!err) {
                res.render('wxpay/wap/index', {
                    orderNo: orderNo,
                    openid: openid
                });
            } else {
                res.send('error');
            }
        });
    }
};

/**
 * 提交订单
 */
exports.wapSubmit = function(req, res) {
    let orderInfo = req.body;
    orderInfo.trade_type = wxpayCfg.trade_type.js_api;
    WXPay.createOrder(orderInfo).then(function(body) {
        logger.info({
            body: body
        }, 'unifiedorder result');
        res.json(body);
    });
};

/**
 * web下单页
 */
exports.toWebSubmit = function(req, res) {
    let orderNo = new Date().getTime();
    res.render('wxpay/web/index', {
        orderNo: orderNo
    });
};

/**
 * web下单
 */
exports.webSubmit = function(req, res) {
    let orderInfo = req.body;
    orderInfo.trade_type = wxpayCfg.trade_type.native;
    WXPay.createOrder(orderInfo).then(function(body) {
        logger.info({
            body: body
        }, 'unifiedorder result');
        if (body.return_code == 'SUCCESS') {
            QRCode.draw(body.code_url, {}, function(err, canvas) {
                if (!err) {
                    let ctx = canvas.getContext('2d');
                    ctx.height = 3000;
                    ctx.width = 3000;
                    let url = canvas.toDataURL('image/svg');
                    res.send(`<img src="${url}" height="400" width="400"/>`);
                }
            });
        }

    });
};