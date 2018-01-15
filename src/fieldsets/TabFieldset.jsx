/**
 * author: KCFE
 * date: 2018/01/08
 * description: 内容为Tab形式的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import FieldConverter from '../FieldConverter';
import Select, { Option } from 'rc-select';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import TabBar from 'rc-tabs/lib/TabBar';


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
      length: length,
      activeTabKey: '1'
    };
    //字段组关联的字段实例
    this.refFields = [];
  }

  validate = () => {
    let resValid = true;
    for(let i = 0; i < this.state.length; i++){
      const tabFields = this.refFields[i];
      let tabValid = Object.keys(tabFields).reduce((suc, key) => {
        const valid = tabFields[key].validate();
        return suc && valid;
      }, true);
      resValid = resValid && tabValid;
    }
    return resValid;
  };

  getValue = () => {
    const fieldsetValue = [];
    for(let i = 0; i < this.state.length; i++){
      const tabFields = this.refFields[i];
      const tabValue = {};
      Object.keys(tabFields).forEach((key) => {
        const value = tabFields[key].getValue();
        Object.assign(tabValue, {[key]: value});
      });
      fieldsetValue.push(tabValue);
    }
    return fieldsetValue;
  };

  handleNumChange = (num) => {
    this.setState({
      length: num,
      activeTabKey: '1'
    });
  };

  handleTabChange = (activeKey) => {
    this.setState({
      activeTabKey: activeKey
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
    let tabPanels = [];
    for(let i = 0; i< this.state.length; i++){
      const tabValue = fieldsetValue[i] || {};
      const tabFields = this.props.fields.map((item) => {
        return (
          <FieldConverter
            {...item}
            key={`tab${i+1}-${item.name}`}
            value={tabValue[item.name]}
            fieldRef={(field) => {
              if(!this.refFields[i]){
                this.refFields[i] = {};
              }
              this.refFields[i][item.name] = field;
            }}
          />
        );
      });
      tabPanels.push(<TabPane key={i+1} tab={`Tab ${i+1}`}>{tabFields}</TabPane>);
    }

    return (
      <div>
        {this.getSelectField()}
        <Tabs
          activeKey={this.state.activeTabKey}
          onChange={this.handleTabChange}
          renderTabBar={()=><TabBar />}
          renderTabContent={()=><TabContent />}
        >
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

TabFieldset.propTypes = {
  //字段组名
  name: PropTypes.string.isRequired,
  //Tab个数标签文本
  numLabel: PropTypes.string,
  //Tab内字段组的json描述
  fields: PropTypes.array,
  //Tab 个数，可固定可变动
  length: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
  ]),
  //字段组的值
  value: PropTypes.any
};

TabFieldset.defaultProps = {
  numLabel: 'Tab个数'
};

export default TabFieldset;
