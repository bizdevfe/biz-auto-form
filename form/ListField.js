import React from 'react';
import {Form, Fieldsets} from '../../src/index';
const ListFieldset = Fieldsets.ListFieldset;

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
        <ListFieldset
          name="bigImageList"
          length={[3,4]}
          numLabel="大图数"
          fields={listFieldContent}
        >
        </ListFieldset>
      </Form>
    );
  }
}

export default FormTest;
