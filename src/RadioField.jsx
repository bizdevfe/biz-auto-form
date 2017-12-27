/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单项分组,带radio可切换
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';
import RadioGroup from './controls/RadioGroup';
import {getValidateRules, switchFieldControl} from './common/utils'

class RadioField extends React.Component {
  constructor(props) {
    super(props);
    let radioValue = props.content[0].option;
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
    this.fieldGroup = {};
  }

  validate = () => {
    return Object.keys(this.fieldGroup).reduce((suc, key) => {
      const valid = this.fieldGroup[key].validate();
      return suc && valid;
    }, true);
  };

  getValue = () => {
    const groupValue = {
      radioValue: this.state.radioValue
    };
    Object.keys(this.fieldGroup).forEach((key) => {
      const value = this.fieldGroup[key].getValue();
      if(value){
        Object.assign(groupValue, {[key]: value});
      }
    });
    return groupValue;
  };

  handleRadioChange = (value) => {
    this.setState({
      radioValue: value
    });
  };

  getRadioGroup = () => {
    const {content} = this.props;
    const options = content.map((item, index) => {
      return item.option;
    });
    return (
      <FormField
        label={this.props.label}
        value={this.state.radioValue}
        onChange={this.handleRadioChange}
      >
        <RadioGroup options={options} />
      </FormField>
    );
  };

  getRadioIndex = () => {
    const {content} = this.props;
    let i = 0;
    for(; i < content.length; i++) {
      const option = content[i].option;
      const optionValue = typeof option === 'string' ? option : option.value;
      if(optionValue === this.state.radioValue) {
        break;
      }
    }
    return i;
  };

  render() {
    const radioIndex = this.getRadioIndex();
    const radioFields = this.props.content[radioIndex].fields || [];
    const groupValue = this.props.value || {};
    const fields = radioFields.map((item, index) => {
      return (
        <FormField
          key={`radio${radioIndex}-field${index}`}
          name={item.name}
          label={item.label}
          required={item.required}
          rules={getValidateRules(item.rules)}
          defaultValue={item.defaultValue}
          tips={item.tips}
          value={groupValue[item.name]}
          ref={(field) => {
            if(field){
              this.fieldGroup[item.name] = field;
            } else {
              delete this.fieldGroup[item.name];
            }
          }}
        >
          {switchFieldControl(item)}
        </FormField>
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

RadioField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  defaultRadio: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired
    ]),
    fields: PropTypes.any.isRequired
  }))
};

RadioField.defaultProps = {

};

export default RadioField;
