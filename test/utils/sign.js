const sign = require('../../utils/sign');
const userCfg = require('../../configs/user');
import test from 'ava';

let data = {
    sign: '42284ee5b6363629a639813dc7a8ecdb',
    result_details: '2016070821001004700239503693^0.02^REFUND_TRADE_FEE_ERROR',
    notify_time: '2016-07-10 18:38:30',
    sign_type: 'MD5',
    notify_type: 'batch_refund_notify',
    notify_id: 'a969f3515f286c40fbd0b7599b0e0c7lms',
    batch_no: '201607101468147101397',
    success_num: '0'
};

test('alipay sign verify', t => {
    t.true(sign.verify(data, userCfg.alipay.partner_key, data.sign));
    t.false(sign.verify(data, userCfg.alipay.partner_key, '123123'));
});