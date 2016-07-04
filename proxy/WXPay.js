'use strict';

const wxpayKit = require('../kits/wxpay_kit');
const wxpayCfg = require('../configs/wxpay');

/**
 * 统一下单
 * @param  {} orderInfo 订单信息
 */
exports.createOrder = function(orderInfo) {
    return wxpayKit.request(wxpayCfg.api_url.unifiedorder, orderInfo);
};