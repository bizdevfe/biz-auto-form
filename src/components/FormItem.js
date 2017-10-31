/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单项
 */
import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'async-validator';

import '../styles/form.less';

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
      errors: null
    };
    if(props.rules) {
      const descriptor = {
        [props.name]: props.rules
      };
      this.validator = new Validator(descriptor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (value) => {
    this.validator && this.validator.validate({[this.props.name]: value}, (errors, fields) => {
      this.setState({ errors });
    });
    this.setState({ value });
    if(this.props.onChange){
      this.props.onChange(value);
    }
  };

  validate = () => {
    let result = true;
    this.validator && this.validator.validate({[this.props.name]: this.state.value}, (errors, fields) => {
      if(errors) {
        result = false;
      }
      this.setState({ errors });
    });
    return result;
  };

  getValue = () => {
    return this.state.value;
  };

  render() {
    const children = React.cloneElement(this.props.children, {
      value: this.state.value,
      onChange: this.handleChange
    });
    return (
      <div className="form-item">
        <label className="item-title">
          {this.props.required ? <em className="red-star">*</em> : null}
          {this.props.label}：
        </label>
        <div className="item-con">
          {children}
          {this.props.tip && <p className="form-item-tips">{this.props.tip}</p>}
          {this.state.errors && <p className="form-validator-error">{this.state.errors[0].message}</p>}
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
  defaultValue: PropTypes.any,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onChange: PropTypes.func
};

FormItem.defaultProps = {
  required: true
};

export default FormItem;
