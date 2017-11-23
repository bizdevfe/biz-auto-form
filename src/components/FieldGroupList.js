/**
 * author: KCFE
 * date: 2017/10/12
 * description: 重复的表单项数组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from "./FormField";
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

class FieldGroupList extends React.Component {
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
    var listValid = true;
    for(let i = 0; i < this.state.length; i++){
      const fieldGroup = this.fieldGroupList[i];
      var groupValid = Object.keys(fieldGroup).reduce((suc, key) => {
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

  handleNumChange = (value) => {
    this.setState({
      length: value
    });
  };

  componentDidUpdate() {

  };

  render() {
    const listValue = this.props.value || [];
    let fieldsList = [];
    for(let i = 0; i< this.state.length; i++){
      const groupValue = listValue[i] || {};
      const fields = React.Children.map(this.props.children, (child) => {
        if(child.type === FormField || child.type === FieldGroup){
          const value = groupValue[child.props.name];
          const childProps = {
            key: child.props.name + (i+1),
            value,
            label: child.props.label + (i+1),
            ref: (item) => {
              if(!this.fieldGroupList[i]){
                this.fieldGroupList[i] = {};
              }
              this.fieldGroupList[i][child.props.name] = item;
            }
          };
          return React.cloneElement(child, childProps);
        }
      });
      fieldsList.push(...fields);
    }

    let selectField = null;
    if(Array.isArray(this.props.length)){
      const options = this.props.length.map((num) => {
        return (
          <Option key={num} value={num}>{num}</Option>
        );
      });
      selectField = (
        <div className="form-item">
          <label className="item-title">
            <em className="red-star">*</em>
            数量：
          </label>
          <div className="item-con">
            <Select
              style={{ width: 100 }}
              value={this.state.length}
              onChange={this.handleNumChange}
            >
              {options}
            </Select>
          </div>
        </div>
      );
    }

    return (
      <div>
        {selectField}
        {fieldsList}
      </div>
    );
  }
}

FieldGroupList.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  length: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
  ]),
  value: PropTypes.any
};

FieldGroupList.defaultProps = {

};

export default FieldGroupList;
