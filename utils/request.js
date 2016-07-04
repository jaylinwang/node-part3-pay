'use strict';
/**
 * request请求的封装
 */
const request = require('requestretry');
const logger = require('./logger');
const Promise = require('bluebird');

/**
 * request请求
 * @param  {Object} options 请求参数
 */
exports.request = function(options) {
    let _options = {
        gzip: true,
        encoding: 'utf8',
        headers: {
            'User-Agent': 'request from node'
        },
        maxAttempts: 3, //最大尝试次数
        retryDelay: 3000, // 每次重试间隔时间
        fullResponse: true,
        retryStrategy: request.RetryStrategies.HTTPOrNetworkError
    };
    Object.assign(_options, options);
    let promise = new Promise((resolve, reject) => {
        let req = request(_options, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
        logger.info({
            req: req._req
        }, 'send a request :)');
    });
    return promise;
};