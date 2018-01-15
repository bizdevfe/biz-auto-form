/**
 * author: KCFE
 * date: 2017/10/12
 * description: 按个数重复的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import FieldConverter from '../FieldConverter';
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
    //字段组关联的字段实例
    this.refFields = [];
  }

  validate = () => {
    let resValid = true;
    for(let i = 0; i < this.state.length; i++){
      const groupFields = this.refFields[i];
      let groupValid = Object.keys(groupFields).reduce((suc, key) => {
        const valid = groupFields[key].validate();
        return suc && valid;
      }, true);
      resValid = resValid && groupValid;
    }
    return resValid;
  };

  getValue = () => {
    const fieldsetValue = [];
    for(let i = 0; i < this.state.length; i++){
      const groupFields = this.refFields[i];
      const groupValue = {};
      Object.keys(groupFields).forEach((key) => {
        const value = groupFields[key].getValue();
        Object.assign(groupValue, {[key]: value});
      });
      fieldsetValue.push(groupValue);
    }

    return fieldsetValue;
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
          label={this.props.numLabel}
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
    const fieldsetValue = this.props.value || [];
    let fields = [];
    for(let i = 0; i< this.state.length; i++){
      const groupValue = fieldsetValue[i] || {};
      const groupFields = this.props.fields.map((item) => {
        return (
          <FieldConverter
            {...item}
            key={item.name + (i+1)}
            label={item.label + (i+1)}
            value={groupValue[item.name]}
            fieldRef={(field) => {
              if(!this.refFields[i]){
                this.refFields[i] = {};
              }
              this.refFields[i][item.name] = field;
            }}
          />
        );
      });
      fields.push(...groupFields);
    }

    return (
      <div>
        {this.getSelectField()}
        {fields}
      </div>
    );
  }
}

ListFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  numLabel: PropTypes.string,
  length: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
  ]),
  value: PropTypes.any,
  fields: PropTypes.array
};

ListFieldset.defaultProps = {

};

export default ListFieldset;
