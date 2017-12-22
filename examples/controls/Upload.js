import React from 'react';
import {ImageUpload} from '../../src/index';
import {VideoUpload} from '../../src/index';

class UploadTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValue: 'http://xx.png',
      videoValue: 'http://xx.mp4'
    }
  }

  handleChange1 = (value) => {
    this.setState({
      imageValue: value
    });
    console.log(value);
  };

  handleChange2 = (value) => {
    this.setState({
      videoValue: value
    });
    console.log(value);
  };

  render() {
    return (
      <div>
        <div>
          <ImageUpload
            value={this.state.imageValue}
            uploadRules={{
              size: 2,
              types: ['png'],
              key: '200x100'
            }}
            onChange={this.handleChange1}
          />
        </div>

        <div style={{marginTop: 10}}>
          <VideoUpload
            value={this.state.videoValue}
            uploadRules={{
              size: 2*1024,
              key: 'mp4'
            }}
            onChange={this.handleChange2}
          />
        </div>
      </div>
    );
  }
}

export default UploadTest;
