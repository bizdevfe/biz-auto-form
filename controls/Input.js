import React from 'react';
import {Input} from '../../src/index';

class InputTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'http://'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <Input
        value={this.state.value}
        limiter={{
          type: 'byte',
          max: 512
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default InputTest;
