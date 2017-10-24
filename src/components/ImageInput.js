/**
 * author: KCFE
 * date: 2017/10/12
 * description: 用于图片上传的 输入框
 */
import React from 'react';
import PropTypes from 'prop-types';
import Upload from 'rc-upload';
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
        const maxSizeKB = uploadRules.size * 1024;
        if(file.size > maxSizeKB) {
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
    return (
      <div>
        <Upload
          {...this.uploaderProps}
          style={{outline: 'none', cursor: 'pointer'}}
        >
          <Input
            value={this.state.value}
            onChange={this.handleChange}
            disabled
          />
          <button
            className="btn"
            style={{marginLeft: 2}}
          >
            上传图片
          </button>
        </Upload>
      </div>
    );
  }
}

ImageInput.propTypes = {
  value: PropTypes.string,
  rules: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

ImageInput.defaultProps = {

};

export default ImageInput;