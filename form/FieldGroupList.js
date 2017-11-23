import React from 'react';
import Input from '../../src/components/controls/Input';
import FormField from '../../src/components/FormField';
import FieldGroupList from '../../src/components/FieldGroupList';
import Form from '../../src/components/Form';
import ValidateRules from '../../src/components/common/ValidateRules';

class FormTest extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FieldGroupList name="bigImageList" length={[3,4]}>
          <FormField name="link" label="链接" defaultValue="http://" rules={[ValidateRules.url]}>
            <Input limiter={{max: 512}} />
          </FormField>

          <FormField name="text" label="文本" rules={[ValidateRules.required]}>
            <Input limiter={{max: 20}} />
          </FormField>
        </FieldGroupList>
      </Form>
    );
  }
}

export default FormTest;
