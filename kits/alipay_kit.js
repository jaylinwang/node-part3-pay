'use strict';

const logger = require('../utils/logger');
const sign = require('../utils/sign');
const Promise = require('bluebird');

const userCfg = require('../configs/user');
const alipayCfg = require('../configs/alipay');

/**
 * 构建请求表单
 * @param  {} data
 */
exports.buildRequestForm = function(data) {
    let _data = Object.assign({
        partner: userCfg.alipay.partner,
        _input_charset: 'utf-8',
        sign_type: 'MD5'
    }, data || {});
    _data.sign = sign.md5(_data, userCfg.alipay.partner_key);

    let sbHtml = `<form id="PayForm" action="${alipayCfg.gateway}?_input_charset=utf-8" method="post">`;
    for (let key in _data) {
        sbHtml += `<input type="hidden" name="${key}" value="${_data[key]}">`;
    }
    sbHtml += '<input type="submit" value="submit" style="display:none"></form>';
    sbHtml += '<script>document.getElementById("PayForm").submit()</script>';

    logger.info(sbHtml);
    return Promise.resolve(sbHtml);
};