/**
 * author: KCFE
 * date: 2017/10/12
 * description: 带radio可切换的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import RadioGroup from '../controls/RadioGroup';
import FieldConverter from '../FieldConverter';

class RadioFieldset extends React.Component {
  constructor(props) {
    super(props);
    let radioValue = props.optionFields[0].option;
    if(typeof radioValue === 'object'){
      radioValue = radioValue.value;
    }
    if(props.defaultRadio){
      radioValue = props.defaultRadio;
    }
    if(props.value && props.value.radioValue){
      radioValue = props.value.radioValue;
    }
    this.state = {
      radioValue: radioValue
    };
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
    const fieldsetValue = {
      radioValue: this.state.radioValue
    };
    Object.keys(this.refFields).forEach((key) => {
      const value = this.refFields[key].getValue();
      Object.assign(fieldsetValue, {[key]: value});
    });
    return fieldsetValue;
  };

  handleRadioChange = (value) => {
    this.setState({
      radioValue: value
    });
  };

  getRadioGroup = () => {
    const options = this.props.optionFields.map((item, index) => {
      return item.option;
    });
    return (
      <FormField
        label={this.props.radioLabel}
        value={this.state.radioValue}
        onChange={this.handleRadioChange}
      >
        <RadioGroup options={options} />
      </FormField>
    );
  };

  getRadioIndex = () => {
    const {optionFields} = this.props;
    let i = 0;
    for(; i < optionFields.length; i++) {
      const option = optionFields[i].option;
      const optionValue = typeof option === 'string' ? option : option.value;
      if(optionValue === this.state.radioValue) {
        break;
      }
    }
    return i;
  };

  render() {
    const radioIndex = this.getRadioIndex();
    const jsonFields = this.props.optionFields[radioIndex].fields || [];
    const fieldsetValue = this.props.value || {};
    const fields = jsonFields.map((item, index) => {
      return (
        <FieldConverter
          {...item}
          key={`radio${radioIndex}-field${index}`}
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
        {this.getRadioGroup()}
        {fields}
      </div>
    );
  }
}

RadioFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  radioLabel: PropTypes.string,
  value: PropTypes.any,
  defaultRadio: PropTypes.string,
  optionFields: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired
    ]),
    fields: PropTypes.any.isRequired
  }))
};

RadioFieldset.defaultProps = {

};

export default RadioFieldset;
