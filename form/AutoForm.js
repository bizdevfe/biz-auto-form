import React from 'react';
import AutoForm from '../../src/components/AutoForm';

import descriptor from '../json/form_desc.json';

// const descriptor = [
//   {
//     name: 'title',
//     control: 'RedWordInput',
//     label: '标题',
//     defaultValue: '{哈哈哈}我是标题',
//     limiter: {max: 24},
//     rules: [
//       ValidateRules.required
//     ]
//   },
//   {
//     name: 'link',
//     control: 'Input',
//     label: '链接',
//     defaultValue: 'http://',
//     limiter: {max: 512},
//     rules: [
//       ValidateRules.url
//     ]
//   },
//   {
//     name: 'description',
//     control: 'Textarea',
//     label: '描述',
//     limiter: {max: 80},
//     rules: [
//       ValidateRules.required
//     ]
//   },
//   {
//     name: 'descriptionLink',
//     control: 'LinkTextarea',
//     label: '子链描述',
//     limiter: {max: 80},
//     rules: [
//       ValidateRules.required
//     ]
//   },
//   {
//     name: 'image',
//     control: 'ImageInput',
//     label: '图片',
//     rules: [
//       {required: true, message: '请上传图片'}
//     ],
//     uploadRules: {
//       size: 20,
//       types: ['png'],
//       key: '200x100'
//     }
//   },
// ];

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
