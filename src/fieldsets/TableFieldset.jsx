/**
 * author: KCFE
 * date: 2018/01/08
 * description: 收取Table数据的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import ListFieldset from './ListFieldset';
import Select, { Option } from 'rc-select';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';


class TableFieldset extends React.Component {
  constructor(props) {
    super(props);
    let rowNum = props.rowNum, colNum = props.colNum;
    if(Array.isArray(props.rowNum)){
      rowNum = props.rowNum[0];
    }
    if(Array.isArray(props.colNum)){
      colNum = props.colNum[0];
    }
    if(props.value && Array.isArray(props.value.header)){
      colNum = props.value.header.length;
    }
    if(props.value && Array.isArray(props.value.rows)){
      rowNum = props.value.rows.length + 1;
    }
    this.state = {
      rowNum,
      colNum,
      activeTabKey: '1'
    };
    //字段组关联的字段实例
    this.refFields = [];
  }

  validate = () => {
    let resValid = true;
    for(let i = 0; i < this.state.rowNum; i++){
      let tabValid = this.refFields[i].validate();
      resValid = resValid && tabValid;
    }
    return resValid;
  };

  getValue = () => {
    const fieldsetValue = {};
    for(let i = 0; i < this.state.rowNum; i++){
      const tab = this.refFields[i];
      if(i === 0){
        fieldsetValue.header = tab.getValue();
      } else {
        if(!fieldsetValue.rows){
          fieldsetValue.rows = [];
        }
        fieldsetValue.rows[i-1] = {cols: tab.getValue()};
      }
    }
    return fieldsetValue;
  };

  handleRowNumChange = (num) => {
    this.setState({
      rowNum: num,
      activeTabKey: '1'
    });
  };

  handleColNumChange = (num) => {
    this.setState({
      colNum: num,
      activeTabKey: '1'
    });
  };

  handleTabChange = (activeKey) => {
    this.setState({
      activeTabKey: activeKey
    });
  };

  getRowSelect = () => {
    let selectField = null;
    if(Array.isArray(this.props.rowNum)){
      const options = this.props.rowNum.map((num, index) => {
        return (
          <Option key={index} value={num}>{num}</Option>
        );
      });
      selectField = (
        <FormField
          label="表格行数"
          value={this.state.rowNum}
          onChange={this.handleRowNumChange}
        >
          <Select style={{ width: 100 }}>
            {options}
          </Select>
        </FormField>
      );
    }
    return selectField;
  };

  getColSelect = () => {
    let selectField = null;
    if(Array.isArray(this.props.colNum)){
      const options = this.props.colNum.map((num, index) => {
        return (
          <Option key={index} value={num}>{num}</Option>
        );
      });
      selectField = (
        <FormField
          label="表格列数"
          value={this.state.colNum}
          onChange={this.handleColNumChange}
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
    const props = this.props;
    const fieldsetValue = props.value || {};
    const headerValue = fieldsetValue.header;
    const rowsValue = fieldsetValue.rows || [];
    const headerTab = (
      <TabPane key="1" tab="第 1 行" style={{padding: '10px 0',maxHeight: '500px'}} forceRender>
        <ListFieldset
          key={`row1-${this.state.colNum}cols`}
          name="header"
          length={this.state.colNum}
          fields={props.headerFields}
          value={headerValue}
          ref={(field) => {
            this.refFields[0] = field;
          }}
        />
      </TabPane>
    );

    let rowTabs = [];
    for(let i = 1; i< this.state.rowNum; i++){
      const colsValue = rowsValue[i-1] || {};
      rowTabs.push(
        <TabPane key={i+1} tab={`第 ${i+1} 行`} style={{padding: '10px 0',maxHeight: '500px'}} forceRender>
          <ListFieldset
            key={`row${i+1}-${this.state.colNum}cols`}
            name={`row${i+1}`}
            length={this.state.colNum}
            fields={props.rowFields}
            value={colsValue.cols}
            ref={(field) => {
              this.refFields[i] = field;
            }}
          />
        </TabPane>
      );
    }

    return (
      <div>
        {this.getRowSelect()}
        {this.getColSelect()}
        <Tabs
          activeKey={this.state.activeTabKey}
          onChange={this.handleTabChange}
          renderTabBar={()=><ScrollableInkTabBar />}
          renderTabContent={()=><TabContent animated={false} />}
          style={{border: '2px solid #f3f3f3', margin: '10px 0 20px'}}
        >
          {headerTab}
          {rowTabs}
        </Tabs>
      </div>
    );
  }
}

TableFieldset.propTypes = {
  //字段组名
  name: PropTypes.string.isRequired,
  //字段组的值
  value: PropTypes.any,
  //Tab 个数，可固定可变动
  rowNum: PropTypes.array,
  colNum: PropTypes.array,
  //Tab内字段组的json描述
  headerFields: PropTypes.array,
  //Tab内字段组的json描述
  rowFields: PropTypes.array,
};

TableFieldset.defaultProps = {

};

export default TableFieldset;
