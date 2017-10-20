/**
 * author: KCFE
 * date: 2017/10/12
 * description: 用于图片上传的 输入框
 */
import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

import '../styles/button.less';

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    const {uploadRules} = props;
    this.uploaderProps = {
      action: '/upload.do',
      data: {
        key: uploadRules.key
      },
      beforeUpload(file) {
        console.log(file.type);
        const maxSizeKB = uploadRules.maxSize*1024;
        if(file.size>maxSizeKB) {
          alert(`图片超过${uploadRules.maxSize}KB`);
          return false;
        }
      },
      onSuccess(file) {
        if(file.status) {
          me.setState({
            value: file.data
          });
        }
      },
      onError(err) {
        console.log('onError', err);
      }
    };
    this.state = {
      value: props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (value) => {
    const {onChange} = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const {limiter, disabled} = this.props;
    return (
      <div>
        <Upload {...this.uploaderProps}>
          <Input
            value={this.state.value}
            limiter={{
              ...limiter,
              filterSymbol: true
            }}
            disabled={disabled}
            onChange={this.handleChange}
            inputRef={(input) => { this.inputElem = input; }}
          />
          <button
            className="btn"
            onClick={this.insertRedWord}>
            插入标红词
          </button>
        </Upload>
      </div>
    );
  }
}

ImageInput.propTypes = {
  value: PropTypes.string,
  limiter: PropTypes.shape({
    type: PropTypes.string,
    max: PropTypes.number,
    filterSymbol: PropTypes.bool
  }),
  rules: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

ImageInput.defaultProps = {
  disabled: false
};

export default ImageInput;