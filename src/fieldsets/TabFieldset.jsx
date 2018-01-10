/**
 * author: KCFE
 * date: 2018/01/08
 * description: 内容为Tab形式的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import {getValidateRules, switchFieldControl} from '../common/utils';
import Select, { Option } from 'rc-select';
import Tabs, { TabPane } from 'rc-tabs';


class TabFieldset extends React.Component {
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
    //存放所有Tab下字段
    this.fieldsInTabs = [];
  }

  validate = () => {
    let resValid = true;
    for(let i = 0; i < this.state.length; i++){
      const tabFields = this.fieldsInTabs[i];
      let tabValid = Object.keys(tabFields).reduce((suc, key) => {
        const valid = tabFields[key].validate();
        return suc && valid;
      }, true);
      resValid = resValid && tabValid;
    }
    return resValid;
  };

  getValue = () => {
    const tabsValue = [];
    for(let i = 0; i < this.state.length; i++){
      const tabFields = this.fieldsInTabs[i];
      const tabValue = {};
      Object.keys(tabFields).forEach((key) => {
        const value = tabFields[key].getValue();
        if(value){
          Object.assign(tabValue, {[key]: value});
        }
      });
      tabsValue.push(tabValue);
    }
    return tabsValue;
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

  getTabFields = () => {
    const tabsValue = this.props.value || [];
    let tabPanels = [];
    for(let i = 0; i< this.state.length; i++){
      const tabValue = tabsValue[i] || {};
      const tabFields = this.props.content.map((item) => {
        const fieldProps = {
          value: tabValue[item.name],
          ref: (field) => {
            if(!this.fieldsInTabs[i]){
              this.fieldsInTabs[i] = {};
            }
            this.fieldsInTabs[i][item.name] = field;
          }
        };
        return (
          <FormField
            key={`tab${i+1}-${item.name}`}
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
      });
    }

  };

  render() {


    return (
      <div>
        {this.getSelectField()}
        <Tabs
          activeKey={this.state.activeKey}
          onChange={this.onChange}
        >
          <TabPane></TabPane>
          <TabPane></TabPane>
          <TabPane></TabPane>
        </Tabs>
        {fieldsList}
      </div>
    );
  }
}

TabFieldset.propTypes = {
  //字段组名
  name: PropTypes.string.isRequired,
  //Tab选择标签文本
  label: PropTypes.string,
  //Tab内字段组的json描述
  content: PropTypes.array,
  //Tab 个数，可固定可变动
  length: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
  ]),
  //字段组的值
  value: PropTypes.any
};

TabFieldset.defaultProps = {
  label: 'Tab个数'
};

export default TabFieldset;
