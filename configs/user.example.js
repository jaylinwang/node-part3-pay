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
         * 服务器异步通知页面路径
         */
        notify_url: '',
        /**
         * 页面跳转同步通知页面路径
         */
        return_url: ''
    }
};