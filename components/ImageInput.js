import React from 'react';
import ImageInput from '../../src/components/ImageInput';

class ImageInputTest extends React.Component {
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
      <ImageInput
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

export default ImageInputTest;
