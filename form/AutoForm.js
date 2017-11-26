import React from 'react';
import AutoForm from '../../src/components/AutoForm';

import descriptor from '../json/basic_form.json';

class AutoFormTest extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <AutoForm
        onSubmit={this.handleSubmit}
        descriptor={descriptor}
      >
      </AutoForm>
    );
  }
}

export default AutoFormTest;
