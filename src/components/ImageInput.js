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

const imageTypes = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif'
};

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    const {uploadRules} = props;
    const self = this;
    this.uploaderProps = {
      action: '/upload.do',
      data: {
        key: uploadRules.key
      },
      beforeUpload(file) {
        if(uploadRules.types){
          const types = uploadRules.types.map((type) => {
            return imageTypes[type];
          });
          if(file.type.indexOf(types) == -1){
            console.log('图片格式不符合');
            return false;
          }
        }

        if(file.size > uploadRules.size * 1024) {
          alert('图片超过了限制大小');
          return false;
        }
      },
      onSuccess(response) {
        if(response.status == 1) {
          self.handleChange(response.data);
        } else {
          alert('上传失败');
        }
      },
      onError(err) {
        console.log('上传失败：', err.message);
      }
    };
    this.state = {
      value: props.value || ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value === nextProps.value) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || ''
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
            type="button"
            className="btn"
            style={{marginLeft: 5}}
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
  uploadRules: PropTypes.shape({
    size: PropTypes.number,
    types: PropTypes.array,
    key: PropTypes.string
  }),
  onChange: PropTypes.func
};

ImageInput.defaultProps = {

};

export default ImageInput;