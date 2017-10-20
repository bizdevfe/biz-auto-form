import React from 'react';
import LinkTextarea from '../../src/components/LinkTextarea';

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
      <LinkTextarea
        value={this.state.value}
        limiter={{
          max: 50
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default InputTest;
