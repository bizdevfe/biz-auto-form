import React from 'react';
import {AutoForm} from '../../src/index';

class AsyncAutoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
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
    import(`../json/${props.match.params.id}.json`).then((descriptor) => {
      this.setState({
        id: props.match.params.id,
        descriptor: descriptor
      });
    });
  }

  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <AutoForm
        key={this.state.id}
        onSubmit={this.handleSubmit}
        descriptor={this.state.descriptor}
      >
      </AutoForm>
    );
  }
}

export default AsyncAutoForm;


