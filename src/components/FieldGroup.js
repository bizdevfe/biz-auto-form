/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单项分组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from "./FormField";

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
    const fields = React.Children.map(this.props.children, (child) => {
      if(child.type === FormField || child.type === FieldGroup){
        const value = groupValue[child.props.name];
        return React.cloneElement(child, {
          value,
          ref: (field) => {
            this.fieldGroup[child.props.name] = field;
          }
        });
      }
    });
    return (
      <div>
        {fields}
      </div>
    );
  }
}

FieldGroup.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  value: PropTypes.any
};

FieldGroup.defaultProps = {

};

export default FieldGroup;
