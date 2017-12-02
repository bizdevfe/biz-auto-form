'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _utils = require('./common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单项分组
 */
var FieldGroup = function (_React$Component) {
  (0, _inherits3.default)(FieldGroup, _React$Component);

  function FieldGroup(props) {
    (0, _classCallCheck3.default)(this, FieldGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FieldGroup.__proto__ || (0, _getPrototypeOf2.default)(FieldGroup)).call(this, props));

    _this.validate = function () {
      return (0, _keys2.default)(_this.fieldGroup).reduce(function (suc, key) {
        var valid = _this.fieldGroup[key].validate();
        return suc && valid;
      }, true);
    };

    _this.getValue = function () {
      var groupValue = {};
      (0, _keys2.default)(_this.fieldGroup).forEach(function (key) {
        var value = _this.fieldGroup[key].getValue();
        if (value) {
          (0, _assign2.default)(groupValue, (0, _defineProperty3.default)({}, key, value));
        }
      });
      return groupValue;
    };

    _this.fieldGroup = {};
    return _this;
  }

  (0, _createClass3.default)(FieldGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var groupValue = this.props.value || {};
      var fields = this.props.content.map(function (item, index) {
        return _react2.default.createElement(
          _FormField2.default,
          {
            key: index,
            name: item.name,
            label: item.label,
            rules: (0, _utils.getValidateRules)(item.rules),
            defaultValue: item.defaultValue,
            tips: item.tips,
            value: groupValue[item.name],
            ref: function ref(field) {
              _this2.fieldGroup[item.name] = field;
            }
          },
          (0, _utils.switchFieldControl)(item)
        );
      });
      return _react2.default.createElement(
        'div',
        null,
        fields
      );
    }
  }]);
  return FieldGroup;
}(_react2.default.Component);

FieldGroup.propTypes = {
  name: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.any,
  content: _propTypes2.default.array
};

FieldGroup.defaultProps = {};

exports.default = FieldGroup;