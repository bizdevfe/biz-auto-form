/**
 * author: KCFE
 * date: 2017/10/12
 * description: 带插入标红词功能的 输入框
 */
import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

import '../../styles/button.less';

class RedWordInput extends React.Component {
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

  handleChange = (value) => {
    const {onChange} = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  insertRedWord = () => {
    const elem = this.inputElem;
    const str = elem.value;
    const strBefore = str.substring(0, elem.selectionStart);
    const strAfter = str.substring(elem.selectionEnd);
    const selectedStr = str.substring(elem.selectionStart, elem.selectionEnd);
    const word = selectedStr ? selectedStr : '标红词';
    const newStr = strBefore + '{' + word + '}' + strAfter;

    this.setState({value: newStr}, () => {
      elem.selectionStart = newStr.indexOf('{') + 1;
      elem.selectionEnd = newStr.indexOf('}');
      elem.blur();
      elem.focus();
    });
    const {onChange} = this.props;
    if (onChange) {
      onChange(newStr);
    }
  };

  render() {
    const {limiter, disabled} = this.props;
    return (
      <div>
        <div>
          <Input
            value={this.state.value}
            limiter={{
              ...limiter,
              filterSymbol: true
            }}
            disabled={disabled}
            onChange={this.handleChange}
            inputRef={(input) => { this.inputElem = input; }}
          />
        </div>
        <button
          type="button"
          className="btn"
          onClick={this.insertRedWord}>
          插入标红词
        </button>
      </div>
    );
  }
}

RedWordInput.propTypes = {
  value: PropTypes.string,
  limiter: PropTypes.shape({
    type: PropTypes.string,
    max: PropTypes.number,
    filterSymbol: PropTypes.bool
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

RedWordInput.defaultProps = {
  disabled: false
};

export default RedWordInput;