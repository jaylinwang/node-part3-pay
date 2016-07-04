'use strict';
/**
 * 系统日志处理
 */
const bunyan = require('bunyan');

/**
 * request请求打印格式
 */
function reqSerializer(req) {
    return {
        method: req.method,
        url: req.uri.href,
        headers: req.headers,
        body: req.body
    };
}

let logger = bunyan.createLogger({
    name: 'hiteacher-wechat',
    streams: [{
        level: 'info',
        stream: process.stdout
    }, {
        level: 'error',
        stream: process.stdout
    }],
    serializers: {
        req: reqSerializer
    }
});

module.exports = logger;
