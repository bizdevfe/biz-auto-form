/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单项分组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';
import {getValidateRules, switchFieldControl} from './common/utils';

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

  render() {
    const groupValue = this.props.value || {};
    const fields = this.props.content.map((item, index) => {
      return (
        <FormField
          key={index}
          name={item.name}
          label={item.label}
          rules={getValidateRules(item.rules)}
          defaultValue={item.defaultValue}
          tips={item.tips}
          value={groupValue[item.name]}
          ref={(field) => {
            this.fieldGroup[item.name] = field;
          }}
        >
          {switchFieldControl(item)}
        </FormField>
      );
    });
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
