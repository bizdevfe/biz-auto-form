import React from 'react';
import ListField from '../../src/components/ListField';
import Form from '../../src/components/Form';

const listFieldContent = [
  {
    "name": "image",
    "control": "ImageUpload",
    "label": "大图",
    "rules": {"imageRequired": true},
    "uploadRules": {
      "size": 100,
      "types": ["png"],
      "key": "750x320"
    }
  },
  {
    "name": "link",
    "control": "Input",
    "label": "大图链接",
    "defaultValue": "http://",
    "limiter": {"max": 512},
    "rules": {"required": true, "url": true}
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
        <ListField
          name="bigImageList"
          length={[3,4]}
          label="大图数"
          content={listFieldContent}
        >
        </ListField>
      </Form>
    );
  }
}

export default FormTest;
