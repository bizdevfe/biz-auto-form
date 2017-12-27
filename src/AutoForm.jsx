/**
 * author: KCFE
 * date: 2017/10/12
 * description: 自动生成组件的表单
 */
import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import FormField from './FormField';
import ListField from './ListField';
import RadioField from './RadioField';
import GroupField from './GroupField';
import {getValidateRules, switchFieldControl} from "./common/utils";


class AutoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  getFormFields = (descriptor) => {
    const fields = descriptor.map((item, index) => {
      if (item.fieldType === 'ListField'){
        return (
          <ListField
            key={index}
            name={item.name}
            label={item.label}
            length={item.length}
            content={item.content}
          />
        );
      } else if (item.fieldType === 'RadioField'){
        return (
          <RadioField
            key={index}
            name={item.name}
            label={item.label}
            defaultValue={item.defaultValue}
            content={item.content}
          />
        );
      } else if (item.fieldType === 'GroupField'){
        return (
          <GroupField
            key={index}
            name={item.name}
            content={item.content}
          />
        );
      } else {
        const validateRules = getValidateRules(item.rules);
        return (
          <FormField
            key={index}
            name={item.name}
            label={item.label}
            required={item.required}
            rules={validateRules}
            defaultValue={item.defaultValue}
            tips={item.tips}
          >
            {switchFieldControl(item)}
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
        ref={this.props.formRef}
      >
        {formItems}
      </Form>
    );
  }
}

AutoForm.propTypes = {
  descriptor: PropTypes.arrayOf(PropTypes.object), //表单项描述数组
  data: PropTypes.object, //表单数据
  onSubmit: PropTypes.func,
  formRef: PropTypes.func,
};

AutoForm.defaultProps = {

};

export default AutoForm;
