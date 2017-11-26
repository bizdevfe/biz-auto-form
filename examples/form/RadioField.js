import React from 'react';
import RadioField from '../../src/components/RadioField';
import Form from '../../src/components/Form';

const radioFieldContent = [
  {
    "option": {"value": "official", "text": "官网链接"},
    "fields": [
      {
        "name": "webLink",
        "control": "Input",
        "label": "官网链接",
        "defaultValue": "http://",
        "limiter": {"max": 512},
        "rules": {"required": true, "url": true}
      }
    ]
  },
  {
    "option": {"value": "download", "text": "下载链接"},
    "fields": [
      {
        "name": "iosLink",
        "control": "Input",
        "label": "ios下载链接",
        "defaultValue": "http://",
        "limiter": {"max": 512},
        "rules": {"required": true, "url": true}
      },
      {
        "name": "androidLink",
        "control": "Input",
        "label": "android下载链接",
        "defaultValue": "http://",
        "limiter": {"max": 512},
        "rules": {"required": true, "url": true}
      }
    ]
  }
];

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
        <RadioField
          name="buttonLink"
          label="按钮链接"
          content={radioFieldContent}
        >
        </RadioField>
      </Form>
    );
  }
}

export default FormTest;
