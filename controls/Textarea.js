import React from 'react';
import {TextArea} from '../../src/index.jsx';

class TextAreaTest extends React.Component {
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
      <TextArea
        value={this.state.value}
        limiter={{
          max: 24
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextAreaTest;
