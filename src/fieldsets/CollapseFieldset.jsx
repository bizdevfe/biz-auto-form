/**
 * author: KCFE
 * date: 2018/01/08
 * description: 折叠分块保存形式的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import Collapse from 'rc-collapse';
import FieldConverter from '../FieldConverter';
import Button from '../common/Button';

const Panel = Collapse.Panel;

class CollapseFieldset extends React.Component {
  constructor(props) {
    super(props);
    //字段组关联的字段实例
    this.refFields = {};
  }

  validate = () => {
    return Object.keys(this.refFields).reduce((suc, key) => {
      const valid = this.refFields[key].validate();
      return suc && valid;
    }, true);
  };

  getValue = () => {
    const fieldsetValue = {};
    Object.keys(this.refFields).forEach((key) => {
      const value = this.refFields[key].getValue();
      Object.assign(fieldsetValue, {[key]: value});
    });
    return fieldsetValue;
  };

  handleSubmit = () => {
    if( !this.validate() ){
      return;
    }
    if(this.props.onSubmit){
      this.props.onSubmit({
        [this.props.name]: this.getValue()
      });
    }
  };

  render() {
    const fieldsetValue = this.props.value || {};
    const fields = this.props.fields.map((item, index) => {
      return (
        <FieldConverter
          {...item}
          key={item.name}
          value={fieldsetValue[item.name]}
          fieldRef={(field) => {
            if(field){
              this.refFields[item.name] = field;
            } else {
              delete this.refFields[item.name];
            }
          }}
        />
      );
    });
    return (
      <Collapse defaultActiveKey="0">
        <Panel header={this.props.panelTitle}>
          {fields}
          <div className="form-item">
            <div className="item-con" style={{marginLeft: this.props.labelWidth + 10}}>
              <Button onClick={this.handleSubmit}>
                保存
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
    );
  }
}

CollapseFieldset.propTypes = {
  //字段组名
  name: PropTypes.string.isRequired,
  //字段组的值
  value: PropTypes.any,
  //字段组的json描述
  fields: PropTypes.array,
  //折叠面板标题
  panelTitle: PropTypes.string.isRequired,
  //分段保存提交
  onSubmit: PropTypes.func
};

CollapseFieldset.defaultProps = {
  labelWidth: 140
};

export default CollapseFieldset;
