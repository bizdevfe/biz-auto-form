import React from 'react';
import {RadioGroup} from '../../src/index';

const options = [
  {"value": "black", "text": "黑色"},
  {"value": "white", "text": "白色"}
];

class RadioGroupTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'black'
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
      <RadioGroup
        options={options}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default RadioGroupTest;
