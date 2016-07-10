const wxpayKit = require('../../kits/wxpay_kit');
const wxpayCfg = require('../../configs/wxpay');

import test from 'ava';

let order = {
    'goods_detail': [{
        'goods_id': 'iphone6s_16G',
        'wxpay_goods_id': '1001',
        'goods_name': 'iPhone6s 16G',
        'goods_num': 1,
        'price': 1,
        'goods_category': '123456',
        'body': '苹果手机'
    }]
};

test('wxpay pay request', t => {
    t.pass();
});