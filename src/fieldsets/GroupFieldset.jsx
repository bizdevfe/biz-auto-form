/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单项分组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import ListField from './ListField';
import RadioField from './RadioField';
import GroupField from './GroupField';
import {getValidateRules, switchFieldControl} from '../common/utils';

class FieldGroup extends React.Component {
  constructor(props) {
    super(props);
    this.fieldGroup = {};
  }

  validate = () => {
    return Object.keys(this.fieldGroup).reduce((suc, key) => {
      const valid = this.fieldGroup[key].validate();
      return suc && valid;
    }, true);
  };

  getValue = () => {
    const groupValue = {};
    Object.keys(this.fieldGroup).forEach((key) => {
      const value = this.fieldGroup[key].getValue();
      if(value){
        Object.assign(groupValue, {[key]: value});
      }
    });
    return groupValue;
  };

  getFormFields = () => {
    const groupValue = this.props.value || {};
    const fields = this.props.content.map((item, index) => {
      const fieldProps = {
        value: groupValue[item.name],
        ref: (field) => {
          if(field){
            this.fieldGroup[item.name] = field;
          } else {
            delete this.fieldGroup[item.name];
          }
        }
      };
      if (item.fieldType === 'ListField'){
        return (
          <ListField
            key={index}
            name={item.name}
            label={item.label}
            length={item.length}
            content={item.content}
            {...fieldProps}
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
            {...fieldProps}
          />
        );
      } else if (item.fieldType === 'GroupField'){
        return (
          <GroupField
            key={index}
            name={item.name}
            content={item.content}
            {...fieldProps}
          />
        );
      } else {
        return (
          <FormField
            key={index}
            name={item.name}
            label={item.label}
            required={item.required}
            rules={getValidateRules(item.rules)}
            defaultValue={item.defaultValue}
            tips={item.tips}
            {...fieldProps}
          >
            {switchFieldControl(item)}
          </FormField>
        );
      }
    });
    return fields;
  };

  render() {
    const fields = this.getFormFields();
    return (
      <div>
        {fields}
      </div>
    );
  }
}

FieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  content: PropTypes.array
};

FieldGroup.defaultProps = {

};

export default FieldGroup;
