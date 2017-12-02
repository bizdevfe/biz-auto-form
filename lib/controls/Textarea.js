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

var _Limiter = require('../common/Limiter');

var _Limiter2 = _interopRequireDefault(_Limiter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Textarea = function (_React$Component) {
  (0, _inherits3.default)(Textarea, _React$Component);

  function Textarea(props) {
    (0, _classCallCheck3.default)(this, Textarea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Textarea.__proto__ || (0, _getPrototypeOf2.default)(Textarea)).call(this, props));

    _this.handleChange = function (e) {
      var value = e.target.value;
      var onChange = _this.props.onChange;

      if (!('value' in _this.props)) {
        _this.setState({ value: value });
      }
      if (onChange) {
        onChange(value);
      }
    };

    _this.state = {
      value: props.value || ''
    };
    return _this;
  }

  (0, _createClass3.default)(Textarea, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.value === nextProps.value) {
        return false;
      }
      return true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value || ''
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          limiter = _props.limiter,
          disabled = _props.disabled,
          textRef = _props.textRef;

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('textarea', {
          className: 'rc-textarea',
          value: this.state.value,
          onChange: this.handleChange,
          disabled: disabled,
          ref: textRef
        }),
        limiter ? _react2.default.createElement(_Limiter2.default, {
          style: { verticalAlign: 'top' },
          type: limiter.type || 'byte',
          max: limiter.max,
          filterSymbol: limiter.filterSymbol,
          inputValue: this.state.value || ''
        }) : null
      );
    }
  }]);
  return Textarea;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: 区块文本输入
                               */


Textarea.propTypes = {
  value: _propTypes2.default.string,
  limiter: _propTypes2.default.shape({
    type: _propTypes2.default.string,
    max: _propTypes2.default.number,
    filterSymbol: _propTypes2.default.bool
  }),
  disabled: _propTypes2.default.bool,
  textRef: _propTypes2.default.func,
  onChange: _propTypes2.default.func
};

Textarea.defaultProps = {
  disabled: false
};

exports.default = Textarea;