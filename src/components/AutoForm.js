/**
 * author: KCFE
 * date: 2017/10/12
 * description: 自动生成组件的表单
 */
import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import FormField from './FormField';
import ValidateRules from './ValidateRules';

import RedWordInput from './RedWordInput';
import Input from './Input';
import Textarea from './Textarea';
import LinkTextarea from './LinkTextarea';
import ImageInput from './ImageInput';

class AutoForm extends React.Component {
  constructor(props) {
    super(props);
    this.items = {};
  }

  switchItem = (item) => {
    const control = item.control;
    switch (control) {
      case 'RedWordInput':
        return <RedWordInput limiter={item.limiter} />;
        break;
      case 'Input':
        return <Input limiter={item.limiter} />;
        break;
      case 'Textarea':
        return <Textarea limiter={item.limiter} />;
        break;
      case 'LinkTextarea':
        return <LinkTextarea limiter={item.limiter} />;
        break;
      case 'ImageInput':
        return <ImageInput uploadRules={item.uploadRules} />;
        break;
    }
  };

  getValidateRules = (rules) => {
    if( Array.isArray(rules) ){
      return rules;
    }
    return Object.keys(rules).map((key) => {
      const arg = rules[key];
      if(arg === true){
        return ValidateRules[key];
      }
      return ValidateRules[key].apply(arg);
    });
  };

  render() {
    const formItems = this.props.descriptor.map((item, index) => {
      const validateRules = this.getValidateRules(item.rules);
      return (
        <FormField
          key={index}
          name={item.name}
          label={item.label}
          rules={validateRules}
          defaultValue={item.defaultValue}
          tips={item.tips}
        >
          {this.switchItem(item)}
        </FormField>
      );
    });
    return (
      <Form
        data={this.props.data}
        onSubmit={this.props.onSubmit}
      >
        {formItems}
      </Form>
    );
  }
}

AutoForm.propTypes = {
  descriptor: PropTypes.arrayOf(PropTypes.object), //表单项描述数组
  data: PropTypes.object, //表单数据
  onSubmit: PropTypes.func
};

AutoForm.defaultProps = {

};

export default AutoForm;
