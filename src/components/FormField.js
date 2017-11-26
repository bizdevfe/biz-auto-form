/**
 * author: KCFE
 * date: 2017/10/12
 * description: 单项表单项,负责传值和校验
 */
import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'async-validator';

import '../styles/form.less';

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
      errors: null
    };
    if(props.rules) {
      const rulesDescriptor = {
        [props.name]: props.rules
      };
      this.validator = new Validator(rulesDescriptor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== null) {
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
          {this.props.tips && <p className="form-item-tips">{this.props.tips}</p>}
          {this.state.errors && <p className="form-validator-error">{this.state.errors[0].message}</p>}
        </div>
      </div>
    );
  }
}

FormField.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  tips: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onChange: PropTypes.func
};

FormField.defaultProps = {
  required: true
};

export default FormField;
