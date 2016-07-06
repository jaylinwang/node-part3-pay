'use strict';

const logger = require('../utils/logger');
const WXPay = require('../proxy/WXPay');
const OAuth = require('wechat-oauth');
const QRCode = require('qrcode');
const sign = require('../utils/sign');

const wxpayCfg = require('../configs/wxpay');
const userCfg = require('../configs/user');
const client = new OAuth(userCfg.wxpay.appid, userCfg.wxpay.app_secret);

/**
 * 跳转至创建订单页面
 */
exports.toWapSubmit = function(req, res) {
    // let orderNo = new Date().getTime();
    // res.render('wxpay/wap/index', {
    //     orderNo: orderNo,
    //     openid: 'oWEeAwq75pCS4OqTsN2LEeDB3NE8'
    // });
    
    let originalUrl = req.originalUrl;
    let code = req.query.code;
    console.log(code);
    if (!code) {
        res.redirect(client.getAuthorizeURL('http://dev.jx-cloud.cc' + originalUrl, 'test', 'snsapi_base'));
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
        //  拼接支付对象
        //  "appId" ： "wx2421b1c4370ec43b",     //公众号名称，由商户传入     
        //  "timeStamp"：" 1395712654",         //时间戳，自1970年以来的秒数     
        //  "nonceStr" ： "e61463f8efa94090b1f366cccfbbb444", //随机串     
        //  "package" ： "prepay_id=u802345jgfjsdfgsdg888",     
        //  "signType" ： "MD5",         //微信签名方式：     
        //  "paySign" ： "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
        let payData = {
            appId: body.appid,
            timeStamp: new Date().getMilliseconds(),
            nonceStr: body.nonce_str,
            signType: 'MD5',
            package: `prepay_id=${body.prepay_id}`
        };
        payData.paySign = sign.md5(payData, `&key=${userCfg.wxpay.mch_key}`);
        res.render('wxpay/wap/pay', {
            payData: payData
        });
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