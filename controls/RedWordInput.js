import React from 'react';
import RedWordInput from '../../src/components/controls/RedWordInput';

class InputTest extends React.Component {
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
      <RedWordInput
        value={this.state.value}
        limiter={{
          max: 24
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default InputTest;
