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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单
 */
var Form = function (_React$Component) {
  (0, _inherits3.default)(Form, _React$Component);

  function Form(props) {
    (0, _classCallCheck3.default)(this, Form);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, props));

    _this.handleSubmit = function (event) {
      event && event.preventDefault();
      if (!_this.validate()) {
        return;
      }
      if (_this.props.onSubmit) {
        var values = _this.getValues();
        _this.props.onSubmit(values);
      }
    };

    _this.getValues = function () {
      var values = {};
      (0, _keys2.default)(_this.items).forEach(function (key) {
        var value = _this.items[key].getValue();
        if (value) {
          (0, _assign2.default)(values, (0, _defineProperty3.default)({}, key, value));
        }
      });
      return values;
    };

    _this.validate = function () {
      return (0, _keys2.default)(_this.items).reduce(function (suc, key) {
        var valid = _this.items[key].validate();
        return suc && valid;
      }, true);
    };

    _this.items = {};
    return _this;
  }

  (0, _createClass3.default)(Form, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var formData = this.props.data || {};
      var formItems = _react2.default.Children.map(this.props.children, function (child) {
        var value = formData[child.props.name];
        return _react2.default.cloneElement(child, {
          value: value,
          ref: function ref(item) {
            _this2.items[child.props.name] = item;
          }
        });
      });
      return _react2.default.createElement(
        'form',
        {
          onSubmit: this.handleSubmit
        },
        formItems,
        _react2.default.createElement(
          'div',
          { className: 'form-item' },
          _react2.default.createElement('label', { className: 'item-title' }),
          _react2.default.createElement(
            'div',
            { className: 'item-con' },
            _react2.default.createElement(
              'button',
              {
                className: 'rc-btn',
                type: 'submit' },
              '\u4FDD\u5B58'
            )
          )
        )
      );
    }
  }]);
  return Form;
}(_react2.default.Component);

Form.propTypes = {
  children: _propTypes2.default.node,
  data: _propTypes2.default.object,
  onSubmit: _propTypes2.default.func
};

Form.defaultProps = {};

exports.default = Form;