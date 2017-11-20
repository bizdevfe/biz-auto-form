import React from 'react';
import Input from '../../src/components/Input';
import RedWordInput from '../../src/components/RedWordInput';
import Textarea from '../../src/components/Textarea';
import LinkTextarea from '../../src/components/LinkTextarea';
import ImageInput from '../../src/components/ImageInput';
import FormField from '../../src/components/FormField';
import FieldGroupList from '../../src/components/FieldGroupList';
import Form from '../../src/components/Form';
import ValidateRules from '../../src/components/ValidateRules';

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
        <FormField
          name="title"
          label="标题"
          tip="标题中可以插入标红词"
          rules={[
            ValidateRules.required
          ]}
        >
          <RedWordInput limiter={{max: 24}} />
        </FormField>

        <FormField
          name="link"
          label="链接"
          defaultValue="http://"
          rules={[
            ValidateRules.url
          ]}
        >
          <Input limiter={{max: 512}} />
        </FormField>

        <FormField
          name="description"
          label="描述"
          rules={[
            ValidateRules.required
          ]}
        >
          <Textarea limiter={{max: 24}} />
        </FormField>

        <FormField
          name="descriptionLink"
          label="子链描述"
          rules={[
            ValidateRules.required
          ]}
        >
          <LinkTextarea limiter={{max: 50}} />
        </FormField>

        <FormField
          name="image"
          label="图片"
          rules={[
            {required: true, message: '请上传图片'}
          ]}
        >
          <ImageInput
            uploadRules={{
              size: 20,
              types: ['png'],
              key: '200x100'
            }}
          />
        </FormField>

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
