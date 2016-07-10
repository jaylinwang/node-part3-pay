'use strict';
/**
 * 用户相关配置
 */

module.exports = {
    /**
     * 用户微信账号相关配置
     */
    wxpay: {
        /**
         * 微信分配的公众账号ID
         */
        appid: '',

        /**
         * 微信密钥
         */
        app_secret: '',

        /**
         * 微信支付分配的商户号
         */
        mch_id: '',

        /**
         * 支付api加密key
         */
        mch_key: '',

        /**
         * 微信回调地址
         */
        notify_url: ''
    },

    /**
     * 用户支付宝账号相关配置
     */
    alipay: {
        /**
         * 支付宝分配的商户号
         */
        partner: '',

        /**
         * 支付宝md5
         */
        partner_key: '',

        /**
         * 支付宝卖家账号
         */
        seller_id: '',

        /**
         * 服务器异步通知页面路径（wap支付）
         */
        wap_notify_url: '',

        /**
         * 服务器异步通知页面路径（pc支付）
         */
        web_notify_url: '',

        /**
         * 页面跳转同步通知页面路径（支付）
         */
        pay_return_url: '',

        /**
         * 服务器异步通知页面路径（退款）
         */
        refund_notify_url: ''
    }
};