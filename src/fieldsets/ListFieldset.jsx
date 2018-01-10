/**
 * author: KCFE
 * date: 2017/10/12
 * description: 值为重复结构数组的表单项
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import {getValidateRules, switchFieldControl} from '../common/utils';
import Select, { Option } from 'rc-select';


class ListFieldset extends React.Component {
  constructor(props) {
    super(props);
    let length = props.length;
    if(Array.isArray(props.length)){
      length = props.length[0];
    }
    if(props.value && Array.isArray(props.value)){
      length = props.value.length;
    }
    this.state = {
      length: length
    };
    this.fieldGroupList = [];
  }

  validate = () => {
    let listValid = true;
    for(let i = 0; i < this.state.length; i++){
      const fieldGroup = this.fieldGroupList[i];
      let groupValid = Object.keys(fieldGroup).reduce((suc, key) => {
        const valid = fieldGroup[key].validate();
        return suc && valid;
      }, true);
      listValid = listValid && groupValid;
    }
    return listValid;
  };

  getValue = () => {
    const listValue = [];
    for(let i = 0; i < this.state.length; i++){
      const fieldGroup = this.fieldGroupList[i];
      const groupValue = {};
      Object.keys(fieldGroup).forEach((key) => {
        const value = fieldGroup[key].getValue();
        if(value){
          Object.assign(groupValue, {[key]: value});
        }
      });
      listValue.push(groupValue);
    }

    return listValue;
  };

  handleNumChange = (num) => {
    this.setState({
      length: num
    });
  };

  getSelectField = () => {
    let selectField = null;
    if(Array.isArray(this.props.length)){
      const options = this.props.length.map((num, index) => {
        return (
          <Option key={index} value={num}>{num}</Option>
        );
      });
      selectField = (
        <FormField
          label={this.props.label}
          value={this.state.length}
          onChange={this.handleNumChange}
        >
          <Select style={{ width: 100 }}>
            {options}
          </Select>
        </FormField>
      );
    }
    return selectField;
  };

  render() {
    const listValue = this.props.value || [];
    let fieldsList = [];
    for(let i = 0; i< this.state.length; i++){
      const groupValue = listValue[i] || {};
      const fields = this.props.content.map((item) => {
        return (
          <FormField
            key={item.name + (i+1)}
            name={item.name}
            label={item.label + (i+1)}
            required={item.required}
            rules={getValidateRules(item.rules)}
            defaultValue={item.defaultValue}
            tips={item.tips}
            value={groupValue[item.name]}
            ref={(field) => {
              if(!this.fieldGroupList[i]){
                this.fieldGroupList[i] = {};
              }
              this.fieldGroupList[i][item.name] = field;
            }}
          >
            {switchFieldControl(item)}
          </FormField>
        );
      });
      fieldsList.push(...fields);
    }

    return (
      <div>
        {this.getSelectField()}
        {fieldsList}
      </div>
    );
  }
}

ListFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  content: PropTypes.array,
  length: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
  ]),
  value: PropTypes.any
};

ListFieldset.defaultProps = {

};

export default ListFieldset;
