'use strict';

/**
 * 支付宝相关配置
 */
module.exports = {
    /**
     * 支付宝网关
     */
    gateway: 'https://mapi.alipay.com/gateway.do',

    /**
     * 支付宝相关服务
     */
    service: {
        /**
         * 手机网站支付下单
         */
        wap_direct_pay: 'alipay.wap.create.direct.pay.by.user',

        /**
         * 即使到账支付下单
         */
        direct_pay: 'create_direct_pay_by_user'
    }
};