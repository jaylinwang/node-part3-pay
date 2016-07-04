'use strict';

const uuid = require('uuid');
const crypto = require('crypto');
const parser = require('xml2json');

const logger = require('../utils/logger');
const sign = require('../utils/sign');
const requestUtil = require('../utils/request');

const userCfg = require('../configs/user');

/**
 * 请求api
 * @param  {} url 请求地址
 * @param  {} data 请求数据
 */
exports.request = function(url, data) {
    let _data = Object.assign({
        appid: userCfg.wxpay.appid,
        mch_id: userCfg.wxpay.mch_id,
        nonce_str: uuid.v1().replace(/-/g, ''),
        notify_url: userCfg.wxpay.notify_url || '#'
    }, data || {});
    _data.sign = sign.md5(_data, `&key=${userCfg.wxpay.mch_key}`);

    // let xml = parse.toXml(_data);
    // logger.error(xml);
    let jsonObj = {
        xml: {}
    };

    for (let key in _data) {
        jsonObj.xml[key] = {
            '$t': _data[key]
        };
    }
    logger.info(parser.toXml(jsonObj));
    let _options = Object.assign({}, {
        url: url,
        form: parser.toXml(jsonObj),
        method: 'POST'
    });

    let beginDate = new Date();
    return requestUtil.request(_options).then(function(res) {
        let time = new Date() - beginDate;
        logger.info(`request <${url}> cost ${time}`);
        return res;
    }).catch(function(error) {
        logger.error({
            error: error
        });
    });
};