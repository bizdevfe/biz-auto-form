/**
 * author: KCFE
 * date: 2017/10/12
 * description: 组合结构的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FieldConverter from '../FieldConverter';

class GroupFieldset extends React.Component {
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
      <div>
        {fields}
      </div>
    );
  }
}

GroupFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  fields: PropTypes.array
};

GroupFieldset.defaultProps = {

};

export default GroupFieldset;
