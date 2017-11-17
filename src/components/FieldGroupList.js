/**
 * author: KCFE
 * date: 2017/10/12
 * description: 重复的表单项数组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from "./FormField";

class FieldGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.fieldGroupList = [];
    for(let i = 0; i< props.length; i++){
      this.fieldGroupList.push({});
    }
  }

  validate = () => {
    var listValid = true;
    this.fieldGroupList.forEach(function(fieldGroup){
      var groupValid = Object.keys(fieldGroup).reduce((suc, key) => {
        const valid = fieldGroup[key].validate();
        return suc && valid;
      }, true);
      listValid = listValid && groupValid;
    });
    return listValid;
  };

  getValue = () => {
    const listValue = [];
    this.fieldGroupList.forEach(function(fieldGroup){
      const groupValue = {};
      Object.keys(fieldGroup).forEach((key) => {
        const value = fieldGroup[key].getValue();
        if(value){
          Object.assign(groupValue, {[key]: value});
        }
      });
      listValue.push(groupValue);
    });

    return listValue;
  };

  render() {
    const listValue = this.props.value || [];
    let fieldsList = [];
    for(let i = 0; i< this.props.length; i++){
      const groupValue = listValue[i] || {};
      const fields = React.Children.map(this.props.children, (child) => {
        if(child.type === FormField || child.type === FieldGroup){
          const value = groupValue[child.props.name];
          const childProps = {
            key: child.props.name + (i+1),
            value,
            label: child.props.label + (i+1),
            ref: (item) => {
              this.fieldGroupList[i][child.props.name] = item;
            }
          };
          return React.cloneElement(child, childProps);
        }
      });
      fieldsList.push(...fields);
    }

    return (
      <div>
        {fieldsList}
      </div>
    );
  }
}

FieldGroupList.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  value: PropTypes.any
};

FieldGroupList.defaultProps = {

};

export default FieldGroupList;
