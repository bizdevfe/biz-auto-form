import React from 'react';
import Input from '../../src/components/controls/Input';
import RedWordInput from '../../src/components/controls/RedWordInput';
import Textarea from '../../src/components/controls/Textarea';
import LinkTextarea from '../../src/components/controls/LinkTextarea';
import ImageUpload from '../../src/components/controls/ImageUpload';
import DateTimeInput from '../../src/components/controls/DateTimeInput';
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
        <FormField
          name="title"
          label="标题"
          tips="标题中可以插入标红词"
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
          <ImageUpload
            uploadRules={{
              size: 20,
              types: ['png'],
              key: '200x100'
            }}
          />
        </FormField>

        <FormField
          name="date"
          label="日期"
          rules={[
            ValidateRules.required
          ]}
        >
          <DateTimeInput />
        </FormField>
      </Form>
    );
  }
}

export default FormTest;
