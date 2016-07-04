'use strict';

const uuid = require('uuid');
const crypto = require('crypto');
const parser = require('xml2json');

const logger = require('../utils/logger');
const requestUtil = require('../utils/request');

const userCfg = require('../configs/user');

/**
 * 生成签名
 * @param  {} params 签名参数
 */
let generateSignature = function(params) {
    let signStr = '';
    let sortKey = Object.keys(params).sort();
    for (let i = 0; i < sortKey.length; i++) {
        if (i == 0) {
            signStr += params[sortKey[i]];
        } else {
            signStr += ('&' + params[sortKey[i]]);
        }
    }
    signStr += userCfg.wechat.mch_key;
    return crypto.createHash('md5').update(signStr, 'utf8').digest('hex').toUpperCase();
};

/**
 * 请求api
 * @param  {} url 请求地址
 * @param  {} data 请求数据
 */
exports.request = function(url, data) {
    let _data = Object.assign({
        nonce_str: uuid.v1().replace('-',''),
        notify_url: userCfg.wechat.notify_url
    }, data || {});
    _data.sign = generateSignature(_data);

    // let xml = parse.toXml(_data);
    // logger.error(xml);
    let jsonObj = {
        xml: {}
    };

    for(let key in _data){
        jsonObj.xml[key] = {
            '$t': _data[key]
        };
    }
    let _options = Object.assign({}, {
        url: url,
        form: xml,
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