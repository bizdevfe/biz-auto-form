/**
 * author: KCFE
 * date: 2017/10/12
 * description: 自动生成组件的表单
 */
import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import FormField from './FormField';
import FieldGroupList from './FieldGroupList';
import ValidateRules from './common/ValidateRules';

import RedWordInput from './controls/RedWordInput';
import Input from './controls/Input';
import Textarea from './controls/Textarea';
import LinkTextarea from './controls/LinkTextarea';
import ImageUpload from './controls/ImageUpload';
import DateTimeInput from './controls/DateTimeInput';

class AutoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  switchFieldControl = (item) => {
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
      case 'ImageUpload':
        return <ImageUpload uploadRules={item.uploadRules} />;
        break;
      case 'DateTimeInput':
        return <DateTimeInput />;
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
      return ValidateRules[key](arg);
    });
  };

  getFormFields = (descriptor) => {
    const fields = descriptor.map((item, index) => {
      if(item.control == 'FieldGroupList'){
        const fieldGroup = this.getFormFields(item.content);
        return (
          <FieldGroupList key={index} name={item.name} length={item.length}>
            {fieldGroup}
          </FieldGroupList>
        );
      } else {
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
            {this.switchFieldControl(item)}
          </FormField>
        );
      }
    });
    return fields;
  };

  render() {
    const formItems = this.getFormFields(this.props.descriptor);
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
