import {getStrBytes} from './utils';

const checkMaxBytes = (rule, value, callback) => {
  if (getStrBytes(value) > rule.maxBytes) {
    callback(rule.message);
  } else {
    callback();
  }
};

const checkMinBytes = (rule, value, callback) => {
  if (getStrBytes(value) < rule.minBytes) {
    callback(rule.message);
  } else {
    callback();
  }
};

const validateRules = {
  required: {required: true, whitespace: true, message: '请填写该必填项'},
  imageRequired: {required: true, message: '请上传图片'},
  url: {type: 'url', message: '请输入有效的url'},
  email: {type: 'email', message: '请输入有效的email地址'},
  date: {type: 'date', message: '请输入有效的日期'},
  number: {type: 'number', message: '请输入有效数字'},
  maxBytes: (num) => {
    return { maxBytes: num, message: `该项字节长度不能超过${num}字节`, validator: checkMaxBytes}
  },
  minBytes: (num) => {
    return { minBytes: num, message: `该项字节长度至少${num}字节`, validator: checkMinBytes}
  }
};

export default validateRules;

