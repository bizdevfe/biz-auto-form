import React from 'react';
import {Textarea} from '../../src/index.jsx';

class TextareaTest extends React.Component {
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
      <Textarea
        value={this.state.value}
        limiter={{
          max: 24
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextareaTest;
