'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _RadioGroup = require('./controls/RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _utils = require('./common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioField = function (_React$Component) {
  (0, _inherits3.default)(RadioField, _React$Component);

  function RadioField(props) {
    (0, _classCallCheck3.default)(this, RadioField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RadioField.__proto__ || (0, _getPrototypeOf2.default)(RadioField)).call(this, props));

    _this.validate = function () {
      return (0, _keys2.default)(_this.fieldGroup).reduce(function (suc, key) {
        var valid = _this.fieldGroup[key].validate();
        return suc && valid;
      }, true);
    };

    _this.getValue = function () {
      var groupValue = {
        radioValue: _this.state.radioValue
      };
      (0, _keys2.default)(_this.fieldGroup).forEach(function (key) {
        var value = _this.fieldGroup[key].getValue();
        if (value) {
          (0, _assign2.default)(groupValue, (0, _defineProperty3.default)({}, key, value));
        }
      });
      return groupValue;
    };

    _this.handleRadioChange = function (value) {
      _this.setState({
        radioValue: value
      });
    };

    _this.getRadioGroup = function () {
      var content = _this.props.content;

      var options = content.map(function (item, index) {
        return item.option;
      });
      return _react2.default.createElement(
        _FormField2.default,
        {
          label: _this.props.label,
          value: _this.state.radioValue,
          onChange: _this.handleRadioChange
        },
        _react2.default.createElement(_RadioGroup2.default, { options: options })
      );
    };

    _this.getRadioIndex = function () {
      var content = _this.props.content;

      var i = 0;
      for (; i < content.length; i++) {
        var option = content[i].option;
        var optionValue = typeof option === 'string' ? option : option.value;
        if (optionValue === _this.state.radioValue) {
          break;
        }
      }
      return i;
    };

    var radioValue = props.content[0].option;
    if ((typeof radioValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(radioValue)) === 'object') {
      radioValue = radioValue.value;
    }
    if (props.defaultRadio) {
      radioValue = props.defaultRadio;
    }
    if (props.value && props.value.radioValue) {
      radioValue = props.value.radioValue;
    }
    _this.state = {
      radioValue: radioValue
    };
    _this.fieldGroup = {};
    return _this;
  }

  (0, _createClass3.default)(RadioField, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var radioIndex = this.getRadioIndex();
      var radioFields = this.props.content[radioIndex].fields || [];
      var groupValue = this.props.value || {};
      var fields = radioFields.map(function (item, index) {
        return _react2.default.createElement(
          _FormField2.default,
          {
            key: 'radio' + radioIndex + '-field' + index,
            name: item.name,
            label: item.label,
            rules: (0, _utils.getValidateRules)(item.rules),
            defaultValue: item.defaultValue,
            tips: item.tips,
            value: groupValue[item.name],
            ref: function ref(field) {
              if (field) {
                _this2.fieldGroup[item.name] = field;
              } else {
                delete _this2.fieldGroup[item.name];
              }
            }
          },
          (0, _utils.switchFieldControl)(item)
        );
      });

      return _react2.default.createElement(
        'div',
        null,
        this.getRadioGroup(),
        fields
      );
    }
  }]);
  return RadioField;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: 表单项分组,带radio可切换
                               */


RadioField.propTypes = {
  name: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,
  value: _propTypes2.default.any,
  defaultRadio: _propTypes2.default.string,
  content: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    option: _propTypes2.default.oneOfType([_propTypes2.default.string.isRequired, _propTypes2.default.object.isRequired]),
    fields: _propTypes2.default.any.isRequired
  }))
};

RadioField.defaultProps = {};

exports.default = RadioField;