/**
 * author: KCFE
 * date: 2017/10/12
 * description: 区块文本输入
 */
import React from 'react';
import PropTypes from 'prop-types';
import Limiter from './Limiter';

import '../styles/textarea.less';

class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
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
    const {limiter, disabled, textRef} = this.props;
    return (
      <span>
        <textarea
          className="textarea"
          value={this.state.value}
          onChange={this.handleChange}
          disabled={disabled}
          ref={textRef}
        />
        {limiter ?
          <Limiter
            style={{verticalAlign: 'top'}}
            type={limiter.type || 'byte'}
            max={limiter.max}
            filterSymbol={limiter.filterSymbol}
            inputValue={this.state.value}
          />
          : null
        }
      </span>
    );
  }
}

Textarea.propTypes = {
  value: PropTypes.string,
  limiter: PropTypes.shape({
    type: PropTypes.string,
    max: PropTypes.number,
    filterSymbol: PropTypes.bool
  }),
  disabled: PropTypes.bool,
  textRef: PropTypes.func,
  onChange: PropTypes.func
};

Textarea.defaultProps = {
  disabled: false
};

export default Textarea;