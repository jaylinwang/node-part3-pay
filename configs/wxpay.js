'use strict';
/**
 * 微信接口相关配置
 */
let basic_url = 'https://api.mch.weixin.qq.com';

module.exports = {
    /**
     * api请求地址
     */
    api_url: {
        /**
         * 统一下单接口
         */
        unifiedorder: basic_url + '/pay/unifiedorder',

        /**
         * 订单查询接口
         */
        orderquery: basic_url + '/pay/orderquery',

        /**
         * 订单关闭接口
         */
        orderclose: basic_url + '/pay/closeorder',

        /**
         * 申请退款接口
         */
        refund: basic_url + '/secapi/pay/refund',

        /**
         * 查询退款接口
         */
        refundquery: basic_url + '/pay/refundquery',

        /**
         * 下载对账单
         */
        downloadbill: basic_url + '/pay/downloadbill',

        /**
         * 交易保障
         */
        report: basic_url + '/payitil/report'
    },
    trade_type: {
        /**
         * 公众号支付
         */
        js_api: 'JSAPI',

        /**
         * 原生扫码支付
         */
        native: 'NATIVE',

        /**
         * app支付
         */
        app: 'APP'
    }
};