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

var _rcUpload = require('rc-upload');

var _rcUpload2 = _interopRequireDefault(_rcUpload);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * author: KCFE
 * date: 2017/10/12
 * description: 用于图片上传的 输入框
 */
var imageTypes = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif'
};

var ImageUpload = function (_React$Component) {
  (0, _inherits3.default)(ImageUpload, _React$Component);

  function ImageUpload(props) {
    (0, _classCallCheck3.default)(this, ImageUpload);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImageUpload.__proto__ || (0, _getPrototypeOf2.default)(ImageUpload)).call(this, props));

    _this.handleChange = function (value) {
      var onChange = _this.props.onChange;

      if (!('value' in _this.props)) {
        _this.setState({ value: value });
      }
      if (onChange) {
        onChange(value);
      }
    };

    var uploadRules = props.uploadRules;

    var self = _this;
    _this.uploaderProps = {
      action: window.suf_p4p_user_id ? '/material/upload/uploadImage.do?suf_p4p_user_id=' + window.suf_p4p_user_id : '/material/upload/uploadImage.do',
      data: {
        key: uploadRules.key
      },
      beforeUpload: function beforeUpload(file) {
        if (uploadRules.types) {
          var types = uploadRules.types.map(function (type) {
            return imageTypes[type];
          });
          if (types.indexOf(file.type) == -1) {
            console.log('图片格式不符合');
            return false;
          }
        }

        if (file.size > uploadRules.size * 1024) {
          alert('图片超过了限制大小');
          return false;
        }
      },
      onSuccess: function onSuccess(response) {
        if (response.status == 1) {
          self.handleChange(response.data);
        } else {
          alert('上传失败');
        }
      },
      onError: function onError(err) {
        console.log('上传失败：', err.message);
      }
    };
    _this.state = {
      value: props.value || ''
    };
    return _this;
  }

  (0, _createClass3.default)(ImageUpload, [{
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
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _rcUpload2.default,
          (0, _extends3.default)({}, this.uploaderProps, {
            style: { outline: 'none', cursor: 'pointer' }
          }),
          _react2.default.createElement(_Input2.default, {
            value: this.state.value,
            onChange: this.handleChange,
            disabled: true
          }),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'rc-btn',
              style: { marginLeft: 5 }
            },
            '\u4E0A\u4F20\u56FE\u7247'
          )
        )
      );
    }
  }]);
  return ImageUpload;
}(_react2.default.Component);

ImageUpload.propTypes = {
  value: _propTypes2.default.string,
  uploadRules: _propTypes2.default.shape({
    size: _propTypes2.default.number,
    types: _propTypes2.default.array,
    key: _propTypes2.default.string
  }),
  onChange: _propTypes2.default.func
};

ImageUpload.defaultProps = {};

exports.default = ImageUpload;