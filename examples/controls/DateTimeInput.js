import React from 'react';
import {DateTimeInput} from '../../src/index';

class InputTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '2017-12-08 14:55:00'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
    console.log(value);
  };

  render() {
    return (
      <DateTimeInput
        value={this.state.value}
        onChange={this.handleChange}
        showTime={true}
      />
    );
  }
}

export default InputTest;
