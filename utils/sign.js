'use strict';

const crypto = require('crypto');

/**
 * 参数过滤
 * @param  {} params
 */
let filter = function(params) {
    let _params = {};
    for (let key in params) {
        if (!params[key] || key.toLocaleLowerCase() == 'sign' || key.toLocaleLowerCase() == 'sign_type') {
            continue;
        } else {
            _params[key] = params[key];
        }
    }
    return _params;
};

/**
 * 拼接签名字符串
 * @param  {} params
 */
let createLinkString = function(params) {
    var linkStr = '';
    for (var key in params) {
        linkStr += `${key}=${params[key]}&`;
    }
    linkStr = linkStr.substring(0, linkStr.length - 1);
    return linkStr;
};

/**
 * 字典序排序
 * @param  {} params
 */
let dictSort = function(params) {
    let _params = {};
    let sortKey = Object.keys(params).sort();
    for (let i = 0; i < sortKey.length; i++) {
        _params[sortKey[i]] = params[sortKey[i]];
    }
    return _params;
};

/**
 * md5签名
 * @param  {} params 签名参数
 */
let md5 = function(params, key) {
    let _params = filter(params);
    let signStr = createLinkString(dictSort(_params));
    signStr += key;
    return crypto.createHash('md5').update(signStr, 'utf8').digest('hex');
};

/**
 * md5签名
 * @param  {} params 签名参数
 */
exports.md5 = md5;

/**
 * 验证签名
 */
exports.verify = function(params, key, sign) {
    let mySign = md5(params, key);
    return mySign === sign;
};