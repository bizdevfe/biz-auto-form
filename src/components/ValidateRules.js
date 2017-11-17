import {getStrBytes} from './Util';

const checkMaxBytes = (rule, value, callback) => {
  if (getStrBytes(value) > rule.maxBytes) {
    callback(rule.message);
  } else {
    callback();
  }
};

const validateRules = {
  required: {required: true, whitespace: true, message: '请填写该必填项'},
  url: {type: 'url', message: '请输入有效的url'},
  email: {type: 'email', message: '请输入有效的email地址'},
  date: {type: 'date', message: '请输入有效的日期'},
  maxBytes: (num) => {
    return { maxBytes: num, message: `该项字节长度不能超过${num}字节`, validator: checkMaxBytes}
  }
};

export default validateRules;
