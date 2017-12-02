'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _ListField = require('./ListField');

var _ListField2 = _interopRequireDefault(_ListField);

var _RadioField = require('./RadioField');

var _RadioField2 = _interopRequireDefault(_RadioField);

var _utils = require('./common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoForm = function (_React$Component) {
  (0, _inherits3.default)(AutoForm, _React$Component);

  function AutoForm(props) {
    (0, _classCallCheck3.default)(this, AutoForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AutoForm.__proto__ || (0, _getPrototypeOf2.default)(AutoForm)).call(this, props));

    _this.getFormFields = function (descriptor) {
      var fields = descriptor.map(function (item, index) {
        if (item.fieldType === 'ListField') {
          return _react2.default.createElement(_ListField2.default, {
            key: index,
            name: item.name,
            label: item.label,
            length: item.length,
            content: item.content
          });
        } else if (item.fieldType === 'RadioField') {
          return _react2.default.createElement(_RadioField2.default, {
            key: index,
            name: item.name,
            label: item.label,
            defaultValue: item.defaultValue,
            content: item.content
          });
        } else {
          var validateRules = (0, _utils.getValidateRules)(item.rules);
          return _react2.default.createElement(
            _FormField2.default,
            {
              key: index,
              name: item.name,
              label: item.label,
              rules: validateRules,
              defaultValue: item.defaultValue,
              tips: item.tips
            },
            (0, _utils.switchFieldControl)(item)
          );
        }
      });
      return fields;
    };

    return _this;
  }

  (0, _createClass3.default)(AutoForm, [{
    key: 'render',
    value: function render() {
      var formItems = this.getFormFields(this.props.descriptor);
      return _react2.default.createElement(
        _Form2.default,
        {
          data: this.props.data,
          onSubmit: this.props.onSubmit,
          ref: this.props.formRef
        },
        formItems
      );
    }
  }]);
  return AutoForm;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: 自动生成组件的表单
                               */


AutoForm.propTypes = {
  descriptor: _propTypes2.default.arrayOf(_propTypes2.default.object), //表单项描述数组
  data: _propTypes2.default.object, //表单数据
  onSubmit: _propTypes2.default.func
};

AutoForm.defaultProps = {};

exports.default = AutoForm;