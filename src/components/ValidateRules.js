const validateRules = {
  required: {required: true, whitespace: true, message: '请填写该必填项'},
  url: {type: 'url', message: '请输入有效的url'},
  email: {type: 'email', message: '请输入有效的email地址'},
  date: {type: 'date', message: '请输入有效的日期'}
};

export default validateRules;
