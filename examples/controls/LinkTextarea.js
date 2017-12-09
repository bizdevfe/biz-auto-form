import React from 'react';
import {LinkTextArea} from '../../src/index';

class TextAreaTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <LinkTextArea
        value={this.state.value}
        limiter={{
          max: 50
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextAreaTest;
