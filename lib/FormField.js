'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormField = function (_React$Component) {
  (0, _inherits3.default)(FormField, _React$Component);

  function FormField(props) {
    (0, _classCallCheck3.default)(this, FormField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FormField.__proto__ || (0, _getPrototypeOf2.default)(FormField)).call(this, props));

    _this.handleChange = function (value) {
      _this.validator && _this.validator.validate((0, _defineProperty3.default)({}, _this.props.name, value), function (errors, fields) {
        _this.setState({ errors: errors });
      });
      _this.setState({ value: value });
      if (_this.props.onChange) {
        _this.props.onChange(value);
      }
    };

    _this.validate = function () {
      var result = true;
      _this.validator && _this.validator.validate((0, _defineProperty3.default)({}, _this.props.name, _this.state.value), function (errors, fields) {
        if (errors) {
          result = false;
        }
        _this.setState({ errors: errors });
      });
      return result;
    };

    _this.getValue = function () {
      return _this.state.value;
    };

    _this.state = {
      value: props.value || props.defaultValue,
      errors: null
    };
    if (props.rules) {
      var rulesDescriptor = (0, _defineProperty3.default)({}, props.name, props.rules);
      _this.validator = new _asyncValidator2.default(rulesDescriptor);
    }
    return _this;
  }

  (0, _createClass3.default)(FormField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== undefined && nextProps.value !== null) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = _react2.default.cloneElement(this.props.children, {
        value: this.state.value,
        onChange: this.handleChange
      });
      return _react2.default.createElement(
        'div',
        { className: 'form-item' },
        _react2.default.createElement(
          'label',
          { className: 'item-title' },
          this.props.required ? _react2.default.createElement(
            'em',
            { className: 'red-star' },
            '*'
          ) : null,
          this.props.label,
          '\uFF1A'
        ),
        _react2.default.createElement(
          'div',
          { className: 'item-con' },
          children,
          this.props.tips && _react2.default.createElement(
            'p',
            { className: 'form-item-tips' },
            this.props.tips
          ),
          this.state.errors && _react2.default.createElement(
            'p',
            { className: 'form-validator-error' },
            this.state.errors[0].message
          )
        )
      );
    }
  }]);
  return FormField;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: 单项表单项,负责传值和校验
                               */


FormField.propTypes = {
  children: _propTypes2.default.element.isRequired,
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  tips: _propTypes2.default.string,
  value: _propTypes2.default.any,
  defaultValue: _propTypes2.default.any,
  required: _propTypes2.default.bool,
  rules: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  onChange: _propTypes2.default.func
};

FormField.defaultProps = {
  required: true
};

exports.default = FormField;