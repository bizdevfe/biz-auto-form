/**
 * author: KCFE
 * date: 2017/10/12
 * description: 文本输入
 */
import React from 'react';
import PropTypes from 'prop-types';
import Limiter from './Limiter';

import '../styles/input.less';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value === nextProps.value) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || ''
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
    const {limiter, disabled, inputRef} = this.props;
    return (
      <span>
        <input
          type="text"
          className="input"
          value={this.state.value}
          onChange={this.handleChange}
          disabled={disabled}
          ref={inputRef}
        />
        {limiter ?
          <Limiter
            type={limiter.type || 'byte'}
            max={limiter.max}
            filterSymbol={limiter.filterSymbol}
            inputValue={this.state.value || ''}
          />
          : null
        }
      </span>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  limiter: PropTypes.shape({
    type: PropTypes.string,
    max: PropTypes.number,
    filterSymbol: PropTypes.bool
  }),
  disabled: PropTypes.bool,
  inputRef: PropTypes.func,
  onChange: PropTypes.func
};

Input.defaultProps = {
  disabled: false
};

export default Input;