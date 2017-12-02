'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _rcSelect = require('rc-select');

var _rcSelect2 = _interopRequireDefault(_rcSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListField = function (_React$Component) {
  (0, _inherits3.default)(ListField, _React$Component);

  function ListField(props) {
    (0, _classCallCheck3.default)(this, ListField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ListField.__proto__ || (0, _getPrototypeOf2.default)(ListField)).call(this, props));

    _this.validate = function () {
      var listValid = true;

      var _loop = function _loop(i) {
        var fieldGroup = _this.fieldGroupList[i];
        var groupValid = (0, _keys2.default)(fieldGroup).reduce(function (suc, key) {
          var valid = fieldGroup[key].validate();
          return suc && valid;
        }, true);
        listValid = listValid && groupValid;
      };

      for (var i = 0; i < _this.state.length; i++) {
        _loop(i);
      }
      return listValid;
    };

    _this.getValue = function () {
      var listValue = [];

      var _loop2 = function _loop2(i) {
        var fieldGroup = _this.fieldGroupList[i];
        var groupValue = {};
        (0, _keys2.default)(fieldGroup).forEach(function (key) {
          var value = fieldGroup[key].getValue();
          if (value) {
            (0, _assign2.default)(groupValue, (0, _defineProperty3.default)({}, key, value));
          }
        });
        listValue.push(groupValue);
      };

      for (var i = 0; i < _this.state.length; i++) {
        _loop2(i);
      }

      return listValue;
    };

    _this.handleNumChange = function (num) {
      _this.setState({
        length: num
      });
    };

    _this.getSelectField = function () {
      var selectField = null;
      if (Array.isArray(_this.props.length)) {
        var options = _this.props.length.map(function (num, index) {
          return _react2.default.createElement(
            _rcSelect.Option,
            { key: index, value: num },
            num
          );
        });
        selectField = _react2.default.createElement(
          _FormField2.default,
          {
            label: _this.props.label,
            value: _this.state.length,
            onChange: _this.handleNumChange
          },
          _react2.default.createElement(
            _rcSelect2.default,
            { style: { width: 100 } },
            options
          )
        );
      }
      return selectField;
    };

    var length = props.length;
    if (Array.isArray(props.length)) {
      length = props.length[0];
    }
    if (props.value && Array.isArray(props.value)) {
      length = props.value.length;
    }
    _this.state = {
      length: length
    };
    _this.fieldGroupList = [];
    return _this;
  }

  (0, _createClass3.default)(ListField, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var listValue = this.props.value || [];
      var fieldsList = [];

      var _loop3 = function _loop3(i) {
        var groupValue = listValue[i] || {};
        var fields = _this2.props.content.map(function (item) {
          return _react2.default.createElement(
            _FormField2.default,
            {
              key: item.name + (i + 1),
              name: item.name,
              label: item.label + (i + 1),
              rules: (0, _utils.getValidateRules)(item.rules),
              defaultValue: item.defaultValue,
              tips: item.tips,
              value: groupValue[item.name],
              ref: function ref(field) {
                if (!_this2.fieldGroupList[i]) {
                  _this2.fieldGroupList[i] = {};
                }
                _this2.fieldGroupList[i][item.name] = field;
              }
            },
            (0, _utils.switchFieldControl)(item)
          );
        });
        fieldsList.push.apply(fieldsList, (0, _toConsumableArray3.default)(fields));
      };

      for (var i = 0; i < this.state.length; i++) {
        _loop3(i);
      }

      return _react2.default.createElement(
        'div',
        null,
        this.getSelectField(),
        fieldsList
      );
    }
  }]);
  return ListField;
}(_react2.default.Component); /**
                               * author: KCFE
                               * date: 2017/10/12
                               * description: 值为重复结构数组的表单项
                               */


ListField.propTypes = {
  name: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,
  content: _propTypes2.default.array,
  length: _propTypes2.default.oneOfType([_propTypes2.default.number.isRequired, _propTypes2.default.array.isRequired]),
  value: _propTypes2.default.any
};

ListField.defaultProps = {};

exports.default = ListField;