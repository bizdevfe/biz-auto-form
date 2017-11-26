/**
 * author: KCFE
 * date: 2017/10/12
 * description: radio组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'rc-checkbox';

import '../../styles/radio.less';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.value !== nextProps.value;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== null && nextProps.value !== undefined) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (e) => {
    const { value } = e.target;
    const {onChange} = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const {options} = this.props;
    const radios = options.map((option, index) => {
      const optionValue = typeof option === 'string' ? option : option.value;
      const optionText = typeof option === 'string' ? option : option.text;
      return (
        <label key={index} className="radio-label">
          <Radio
            type="radio"
            prefixCls="rc-radio"
            checked={this.state.value === optionValue}
            value={optionValue}
            onChange={this.handleChange}
            disabled={this.props.disabled}
          />
          <span className="radio-label-text">{optionText}</span>
        </label>
      );
    });
    return (
      <span>
        {radios}
      </span>
    );
  }
}

RadioGroup.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        text: PropTypes.string
      })
    ])
  ),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

RadioGroup.defaultProps = {
  disabled: false
};

export default RadioGroup;
