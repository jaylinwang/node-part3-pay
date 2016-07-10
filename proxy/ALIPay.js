'use strict';

const alipayKit = require('../kits/alipay_kit');
const alipayCfg = require('../configs/alipay');
const userCfg = require('../configs/user');
const dateformat = require('dateformat');

/**
 * Web端下单
 * @param  {} orderInfo 订单信息
 */
exports.submitOrderFromWeb = function(orderInfo) {
    let _orderInfo = Object.assign({
        service: alipayCfg.service.direct_pay,
        payment_type: 1,
        seller_id: userCfg.alipay.seller_id,
        notify_url: userCfg.alipay.pay_notify_url,
        return_url: userCfg.alipay.pay_return_url
    }, orderInfo);
    return alipayKit.buildRequestForm(_orderInfo);
};

/**
 * wap端下单
 * @param  {} orderInfo 订单信息
 */
exports.submitOrderFromWap = function(orderInfo) {
    let _orderInfo = Object.assign({
        service: alipayCfg.service.wap_direct_pay,
        payment_type: 1,
        seller_id: userCfg.alipay.seller_id,
        notify_url: userCfg.alipay.pay_notify_url,
        return_url: userCfg.alipay.pay_return_url
    }, orderInfo);
    return alipayKit.buildRequestForm(_orderInfo);
};

/**
 *支付宝退款
 */
exports.refundFastpay = function(refundInfo) {
    let _refundInfo = Object.assign({
        service: alipayCfg.service.refund_fastpay,
        seller_user_id: userCfg.alipay.seller_id,
        refund_date: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        notify_url: userCfg.alipay.refund_notify_url,
    }, refundInfo);
    return alipayKit.buildRequestForm(_refundInfo);
};