'use strict';

const logger = require('../utils/logger');
const WXPay = require('../proxy/WXPay');
const OAuth = require('wechat-oauth');

const wxpayCfg = require('../configs/wxpay');
const userCfg = require('../configs/user');
const client = new OAuth(userCfg.wxpay.appid, userCfg.wxpay.app_secret);

/**
 * 跳转至创建订单页面
 */
exports.toWapSubmit = function(req, res) {
    let originalUrl = req.originalUrl;
    let code = req.query.code;
    console.log(code);
    if (!code) {
        res.redirect(client.getAuthorizeURL('http://dev.jx-cloud.cc'+originalUrl, 'test', 'snsapi_base'));
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
