'use strict';

const alipayKit = require('../kits/alipay_kit');
const alipayCfg = require('../configs/alipay');

/**
 * Web端下单
 * @param  {} orderInfo 订单信息
 */
exports.submitOrderFromWeb = function(orderInfo) {
    let _orderInfo = Object.assign({
        service: alipayCfg.service.direct_pay
    }, orderInfo);
    return alipayKit.buildRequestForm(_orderInfo);
};

/**
 * wap端下单
 * @param  {} orderInfo 订单信息
 */
exports.submitOrderFromWap = function(orderInfo) {
    let _orderInfo = Object.assign({
        service: alipayCfg.service.wap_direct_pay
    }, orderInfo);
    return alipayKit.buildRequestForm(_orderInfo);
};