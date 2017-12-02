'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var checkMaxBytes = function checkMaxBytes(rule, value, callback) {
  if ((0, _utils.getStrBytes)(value) > rule.maxBytes) {
    callback(rule.message);
  } else {
    callback();
  }
};

var validateRules = {
  required: { required: true, whitespace: true, message: '请填写该必填项' },
  imageRequired: { required: true, message: '请上传图片' },
  url: { type: 'url', message: '请输入有效的url' },
  email: { type: 'email', message: '请输入有效的email地址' },
  date: { type: 'date', message: '请输入有效的日期' },
  maxBytes: function maxBytes(num) {
    return { maxBytes: num, message: '\u8BE5\u9879\u5B57\u8282\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7' + num + '\u5B57\u8282', validator: checkMaxBytes };
  }
};

exports.default = validateRules;