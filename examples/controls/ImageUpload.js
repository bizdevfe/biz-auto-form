import React from 'react';
import {ImageUpload} from '../../src/index';

class ImageUploadTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'http://xx.png'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <ImageUpload
        value={this.state.value}
        uploadRules={{
          size: 20,
          types: ['png'],
          key: '200x100'
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default ImageUploadTest;
