import React from 'react';
import {TextArea} from '../../src/index';

class TextAreaDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'test'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <div className="example">
        <TextArea
          value={this.state.value}
          limiter={{
            max: 30
          }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TextAreaDemo;
