'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFormFields = exports.switchFieldControl = exports.getValidateRules = exports.filterSymbol = exports.trim = exports.getStrBytes = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _RedWordInput = require('../controls/RedWordInput');

var _RedWordInput2 = _interopRequireDefault(_RedWordInput);

var _Input = require('../controls/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Textarea = require('../controls/Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _LinkTextarea = require('../controls/LinkTextarea');

var _LinkTextarea2 = _interopRequireDefault(_LinkTextarea);

var _ImageUpload = require('../controls/ImageUpload');

var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

var _DateTimeInput = require('../controls/DateTimeInput');

var _DateTimeInput2 = _interopRequireDefault(_DateTimeInput);

var _RadioGroup = require('../controls/RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _validateRules = require('./validateRules');

var _validateRules2 = _interopRequireDefault(_validateRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取字符串字节长度
 * @param str
 * @returns {number}
 */
/**
 * author: KCFE
 * date: 2017/10/12
 * description: 通用方法
 */
var getStrBytes = exports.getStrBytes = function getStrBytes(str) {
  var byteLen = 0;
  if (str) {
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        byteLen += 2;
      } else {
        byteLen++;
      }
    }
  }
  return byteLen;
};

/**
 * 去掉空格字符
 * @param str
 */
var trim = exports.trim = function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 插入标红词和插入链接中，过滤掉符号
 * @param str
 */
var filterSymbol = exports.filterSymbol = function filterSymbol(str) {
  return str.replace(/\{(.*?)\|\|.*?\}/g, '$1').replace(/[\{\}]/g, '');
};

/**
 * 将json配置中校验规则转化为校验规则对象数组
 * @param rules
 * @returns {*}
 */
var getValidateRules = exports.getValidateRules = function getValidateRules(rules) {
  if (Array.isArray(rules)) {
    return rules;
  }
  return (0, _keys2.default)(rules).map(function (key) {
    var arg = rules[key];
    if (arg === true) {
      return _validateRules2.default[key];
    }
    return _validateRules2.default[key](arg);
  });
};

/**
 * 转化FormField中的输入控件
 * @param field
 * @returns {XML}
 */
var switchFieldControl = exports.switchFieldControl = function switchFieldControl(field) {
  var control = field.control;
  switch (control) {
    case 'RedWordInput':
      return _react2.default.createElement(_RedWordInput2.default, { limiter: field.limiter });
      break;
    case 'Input':
      return _react2.default.createElement(_Input2.default, { limiter: field.limiter });
      break;
    case 'Textarea':
      return _react2.default.createElement(_Textarea2.default, { limiter: field.limiter });
      break;
    case 'LinkTextarea':
      return _react2.default.createElement(_LinkTextarea2.default, { limiter: field.limiter });
      break;
    case 'ImageUpload':
      return _react2.default.createElement(_ImageUpload2.default, { uploadRules: field.uploadRules });
      break;
    case 'DateTimeInput':
      return _react2.default.createElement(_DateTimeInput2.default, null);
      break;
    case 'RadioGroup':
      return _react2.default.createElement(_RadioGroup2.default, { options: field.options });
      break;
  }
};

/**
 * 根据json配置生成FormField
 * @param jsonConfig
 */
var generateFormFields = exports.generateFormFields = function generateFormFields(jsonConfig) {
  var fields = jsonConfig.map(function (item, index) {
    var validateRules = getValidateRules(item.rules);
    return _react2.default.createElement(
      _FormField2.default,
      {
        key: 'field{index}',
        name: item.name,
        label: item.label,
        rules: validateRules,
        defaultValue: item.defaultValue,
        tips: item.tips
      },
      switchFieldControl(item)
    );
  });
  return fields;
};