import React from 'react';
import {AutoForm} from '../../src/index';

class AsyncAutoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      descriptor: []
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.load(nextProps);
    }
  }

  load(props) {
    import(`../json/${props.location.state.descriptor}.json`).then((descriptor) => {
      this.setState({
        name: props.location.state.descriptor,
        descriptor: descriptor
      });
    });
  }

  render() {
    return (
      <AutoForm
        key={this.state.name}
        onSubmit={this.handleSubmit}
        descriptor={this.state.descriptor}
      >
      </AutoForm>
    );
  }
}

export default AsyncAutoForm;


