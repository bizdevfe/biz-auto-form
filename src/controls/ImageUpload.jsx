/**
 * author: KCFE
 * date: 2017/10/12
 * description: 用于图片上传的 输入框
 */
import React from 'react';
import PropTypes from 'prop-types';
import Upload from 'rc-upload';
import Input from './Input';

const imageTypes = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif'
};

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    const {uploadRules} = props;
    const self = this;
    this.uploaderProps = {
      action: props.action,
      data: {
        key: uploadRules.key
      },
      beforeUpload(file) {
        if(uploadRules.types){
          const types = uploadRules.types.map((type) => {
            return imageTypes[type];
          });
          if(types.indexOf(file.type) == -1){
            self.setState({
              status: '图片格式不符合'
            });
            return false;
          }
        }

        if(file.size > uploadRules.size * 1024) {
          self.setState({
            status: '图片超过了限制大小'
          });
          return false;
        }
      },
      onSuccess(response) {
        if(response.status == 1) {
          self.handleChange(response.data);
        } else {
          self.setState({
            status: '上传失败'
          });
        }
      },
      onError(err) {
        self.setState({
          status: '上传失败：' + err.message
        });
      }
    };
    this.state = {
      value: props.value || '',
      status: null
    };
  }

  shouldComponentUpdate(nextProps, nextState){

  }

  componentWillReceiveProps(nextProps){

  }

  handleChange = (value) => {
    const {onChange} = this.props;
    this.setState({
      value,
      status: null
    });
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
            disabled
          />
          <button
            type="button"
            className="rc-btn"
            style={{marginLeft: 5}}
          >
            上传图片
          </button>
        </Upload>
        {this.state.status ? <p className="form-upload-status">{this.state.status}</p> : null}
      </div>
    );
  }
}

ImageUpload.propTypes = {
  value: PropTypes.string,
  action: PropTypes.string,
  uploadRules: PropTypes.shape({
    size: PropTypes.number,
    types: PropTypes.array,
    key: PropTypes.string
  }),
  onChange: PropTypes.func
};

ImageUpload.defaultProps = {
  action: '/upload.do'
};

export default ImageUpload;