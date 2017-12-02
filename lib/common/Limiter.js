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

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Limiter = function (_React$Component) {
  (0, _inherits3.default)(Limiter, _React$Component);

  function Limiter(props) {
    (0, _classCallCheck3.default)(this, Limiter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Limiter.__proto__ || (0, _getPrototypeOf2.default)(Limiter)).call(this, props));

    _this.getLength = function (str) {
      var type = _this.props.type;
      var length = 0;
      if (type === 'char') {
        length = str.length;
      } else if (type === 'byte') {
        length = (0, _utils.getStrBytes)(str);
      }
      return length;
    };

    return _this;
  }

  (0, _createClass3.default)(Limiter, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          inputValue = _props.inputValue,
          max = _props.max,
          style = _props.style;

      var str = (0, _utils.trim)(inputValue);
      if (this.props.filterSymbol) {
        str = (0, _utils.filterSymbol)(str);
      }
      var currentLen = this.getLength(str);
      return _react2.default.createElement(
        'span',
        { className: currentLen > max ? 'rc-limiter rc-limiter-red' : 'rc-limiter rc-limiter-gray', style: style },
        currentLen,
        ' / ',
        max,
        ' ',
        type === 'char' ? '字符' : '字节'
      );
    }
  }]);
  return Limiter;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: 字数倒计
                               */


Limiter.propTypes = {
  type: _propTypes2.default.oneOf(['char', 'byte']),
  filterSymbol: _propTypes2.default.bool,
  max: _propTypes2.default.number.isRequired,
  inputValue: _propTypes2.default.string.isRequired
};

Limiter.defaultProps = {
  type: 'byte',
  filterSymbol: false
};

exports.default = Limiter;