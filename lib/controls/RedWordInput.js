'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedWordInput = function (_React$Component) {
  (0, _inherits3.default)(RedWordInput, _React$Component);

  function RedWordInput(props) {
    (0, _classCallCheck3.default)(this, RedWordInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RedWordInput.__proto__ || (0, _getPrototypeOf2.default)(RedWordInput)).call(this, props));

    _this.handleChange = function (value) {
      var onChange = _this.props.onChange;

      if (!('value' in _this.props)) {
        _this.setState({ value: value });
      }
      if (onChange) {
        onChange(value);
      }
    };

    _this.insertRedWord = function () {
      var elem = _this.inputElem;
      var str = elem.value;
      var strBefore = str.substring(0, elem.selectionStart);
      var strAfter = str.substring(elem.selectionEnd);
      var selectedStr = str.substring(elem.selectionStart, elem.selectionEnd);
      var word = selectedStr ? selectedStr : '标红词';
      var newStr = strBefore + '{' + word + '}' + strAfter;

      _this.setState({ value: newStr }, function () {
        elem.selectionStart = newStr.indexOf('{') + 1;
        elem.selectionEnd = newStr.indexOf('}');
        elem.blur();
        elem.focus();
      });
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(newStr);
      }
    };

    _this.state = {
      value: props.value || ''
    };
    return _this;
  }

  (0, _createClass3.default)(RedWordInput, [{
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
      var _this2 = this;

      var _props = this.props,
          limiter = _props.limiter,
          disabled = _props.disabled;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Input2.default, {
            value: this.state.value,
            limiter: (0, _extends3.default)({}, limiter, {
              filterSymbol: true
            }),
            disabled: disabled,
            onChange: this.handleChange,
            inputRef: function inputRef(input) {
              _this2.inputElem = input;
            }
          })
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'rc-btn',
            onClick: this.insertRedWord },
          '\u63D2\u5165\u6807\u7EA2\u8BCD'
        )
      );
    }
  }]);
  return RedWordInput;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: 带插入标红词功能的 输入框
                               */


RedWordInput.propTypes = {
  value: _propTypes2.default.string,
  limiter: _propTypes2.default.shape({
    type: _propTypes2.default.string,
    max: _propTypes2.default.number,
    filterSymbol: _propTypes2.default.bool
  }),
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};

RedWordInput.defaultProps = {
  disabled: false
};

exports.default = RedWordInput;