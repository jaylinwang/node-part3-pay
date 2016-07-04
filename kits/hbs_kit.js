'use strict';

exports.registerHelper = function(hbs) {
    let blocks = {};
    hbs.registerHelper('extend', function(name, context) {
        let block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }

        block.push(context.fn(this));
    });

    hbs.registerHelper('block', function(name) {
        let val = (blocks[name] || []).join('\n');
        blocks[name] = [];
        return val;
    });

    //# 等于
    //
    hbs.registerHelper('equal', function(args1, args2, context) {
        if (args1 === args2) {
            //满足添加继续执行
            return context.fn(this);
        } else {
            if (typeof(args1) === 'number' && args1.toString() === args2.toString()) {
                return context.fn(this);
            }
            //不满足条件执行{{else}}部分
            return context.inverse(this);
        }
    });

    //# 大于等于
    //
    hbs.registerHelper('egt', function(args1, args2, context) {
        if (args1 >= args2) {
            return context.fn(this);
        } else {
            return context.inverse(this);
        }

    });

    //# 大于
    //
    hbs.registerHelper('gt', function(args1, args2, context) {
        if (args1 > args2) {
            return context.fn(this);
        } else {
            return context.inverse(this);
        }

    });

    //# 小于等于
    //
    hbs.registerHelper('elt', function(args1, args2, context) {
        if (args1 <= args2) {
            return context.fn(this);
        } else {
            return context.inverse(this);
        }

    });

    //# 小于
    //
    hbs.registerHelper('lt', function(args1, args2, context) {
        if (args1 < args2) {
            return context.fn(this);
        } else {
            return context.inverse(this);
        }

    });

    //# count
    // 配合each实现遍历N次
    hbs.registerHelper('count', function(args1, context) {
        let array = [];
        for (let i = 1; i <= args1; i++) {
            array.push(i);
        }
        return context.fn(array);
    });

    //# 加法
    //
    hbs.registerHelper('add', function(args1, args2) {
        return args1 + args2;
    });

    //# 减法
    hbs.registerHelper('sub', function(args1, args2) {
        return args1 - args2;
    });

    hbs.registerHelper('sub', function(args1, args2) {
        return args1 - args2;
    });
};