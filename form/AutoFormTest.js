import React from 'react';
import {AutoForm} from '../../src/index';

class AsyncAutoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptor: []
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    import(`../json/${props.match.params.json}.json`).then((mod) => {
      this.setState({
        descriptor: mod
      });
    });
  }

  render() {
    return (
      <AutoForm
        onSubmit={this.handleSubmit}
        descriptor={this.state.descriptor}
      >
      </AutoForm>
    );
  }
}

export default AsyncAutoForm;


