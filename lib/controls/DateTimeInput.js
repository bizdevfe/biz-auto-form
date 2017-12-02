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

var _rcCalendar = require('rc-calendar');

var _rcCalendar2 = _interopRequireDefault(_rcCalendar);

var _Picker = require('rc-calendar/lib/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _zh_CN = require('rc-calendar/lib/locale/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

var _Panel = require('rc-time-picker/lib/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/zh-cn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * author: KCFE
 * date: 2017/10/12
 * description: 日期时间输入
 */
var now = (0, _moment2.default)();
now.locale('zh-cn').utcOffset(8);

var format = 'YYYY-MM-DD HH:mm:ss';
var timePickerElement = _react2.default.createElement(_Panel2.default, { defaultValue: (0, _moment2.default)('00:00:00', 'HH:mm:ss') });

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}

function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  var date = (0, _moment2.default)();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf(); // can not select days before today
}

var DateTimeInput = function (_React$Component) {
  (0, _inherits3.default)(DateTimeInput, _React$Component);

  function DateTimeInput(props) {
    (0, _classCallCheck3.default)(this, DateTimeInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateTimeInput.__proto__ || (0, _getPrototypeOf2.default)(DateTimeInput)).call(this, props));

    _initialiseProps.call(_this);

    var value = null;
    if (props.value) {
      value = (0, _moment2.default)(props.value, format);
    }
    _this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: value
    };
    return _this;
  }

  (0, _createClass3.default)(DateTimeInput, [{
    key: 'render',
    value: function render() {
      var state = this.state;
      var calendar = _react2.default.createElement(_rcCalendar2.default, {
        locale: _zh_CN2.default,
        style: { zIndex: 1000 },
        dateInputPlaceholder: '\u8BF7\u8F93\u5165\u65E5\u671F\u65F6\u95F4',
        formatter: getFormat(state.showTime),
        timePicker: state.showTime ? timePickerElement : null,
        defaultValue: now,
        showDateInput: state.showDateInput,
        disabledDate: disabledDate
      });
      return _react2.default.createElement(
        'div',
        { style: {
            boxSizing: 'border-box',
            position: 'relative',
            display: 'block',
            lineHeight: 1.5
          }
        },
        _react2.default.createElement(
          _Picker2.default,
          {
            animation: 'slide-up',
            disabled: state.disabled,
            calendar: calendar,
            value: state.value,
            onChange: this.handleChange
          },
          function (_ref) {
            var value = _ref.value;

            return _react2.default.createElement(
              'span',
              { tabIndex: '0' },
              _react2.default.createElement('input', {
                placeholder: '\u8BF7\u9009\u62E9\u65E5\u671F\u65F6\u95F4',
                className: 'rc-input',
                disabled: state.disabled,
                readOnly: true,
                tabIndex: '-1',
                value: value && value.format(getFormat(state.showTime)) || ''
              })
            );
          }
        )
      );
    }
  }]);
  return DateTimeInput;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleChange = function (value) {
    console.log('DatePicker change: ', value && value.format(format));
    _this2.setState({
      value: value
    });
    var onChange = _this2.props.onChange;

    if (onChange) {
      onChange(value && value.format(getFormat(_this2.state.showTime)) || '');
    }
  };
};

DateTimeInput.propTypes = {
  value: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};

DateTimeInput.defaultProps = {
  disabled: false
};

exports.default = DateTimeInput;