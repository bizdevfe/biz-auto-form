/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单项
 */
import React from 'react';
import PropTypes from 'prop-types';

import '../styles/form.less';

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handleChange = (value) => {
    this.props.onChange(this.props.name, value);
  };

  render() {
    const value = this.props.children.props.value || this.props.value || '';
    const children = React.cloneElement(this.props.children, {
      value,
      onChange: this.handleChange
    });
    return (
      <div className="form-item">
        <label className="item-title">
          <em className="red-star">*</em>{this.props.label}：
        </label>
        <div className="item-con">
          {children}
          {this.props.tip && <p className="form-item-tips">{this.props.tip}</p>}
          {this.state.error && <p className="form-validator-error">{this.state.error}</p>}
        </div>
      </div>
    );
  }
}

FormItem.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  tip: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
};

FormItem.defaultProps = {

};

export default FormItem;
