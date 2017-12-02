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

var _rcCheckbox = require('rc-checkbox');

var _rcCheckbox2 = _interopRequireDefault(_rcCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = function (_React$Component) {
  (0, _inherits3.default)(RadioGroup, _React$Component);

  function RadioGroup(props) {
    (0, _classCallCheck3.default)(this, RadioGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RadioGroup.__proto__ || (0, _getPrototypeOf2.default)(RadioGroup)).call(this, props));

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

  (0, _createClass3.default)(RadioGroup, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.value !== nextProps.value;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && nextProps.value !== null && nextProps.value !== undefined) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options;

      var radios = options.map(function (option, index) {
        var optionValue = typeof option === 'string' ? option : option.value;
        var optionText = typeof option === 'string' ? option : option.text;
        return _react2.default.createElement(
          'label',
          { key: index, className: 'radio-label' },
          _react2.default.createElement(_rcCheckbox2.default, {
            type: 'radio',
            prefixCls: 'rc-radio',
            checked: _this2.state.value === optionValue,
            value: optionValue,
            onChange: _this2.handleChange,
            disabled: _this2.props.disabled
          }),
          _react2.default.createElement(
            'span',
            { className: 'rc-radio-label-text' },
            optionText
          )
        );
      });
      return _react2.default.createElement(
        'span',
        null,
        radios
      );
    }
  }]);
  return RadioGroup;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: radio组件
                               */


RadioGroup.propTypes = {
  value: _propTypes2.default.string,
  options: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    value: _propTypes2.default.string,
    text: _propTypes2.default.string
  })])),
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};

RadioGroup.defaultProps = {
  disabled: false
};

exports.default = RadioGroup;