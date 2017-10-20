/**
 * author: KCFE
 * date: 2017/10/12
 * description: 带插入链接的区块文本输入
 */
import React from 'react';
import PropTypes from 'prop-types';
import Textarea from './Textarea';

import '../styles/button.less';

class LinkTextarea extends React.Component {
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

  handleChange = (value) => {
    const {onChange} = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  insertLink = () => {
    const link = prompt('请输入超链接','http://');
    if(!link){
      return;
    }
    const elem = this.textareaElem;
    const str = elem.value;
    const strBefore = str.substring(0, elem.selectionStart);
    const strAfter = str.substring(elem.selectionEnd);
    const selectedStr = str.substring(elem.selectionStart, elem.selectionEnd);
    const word = selectedStr ? selectedStr : '链接词';
    const newStr = strBefore + '{' + word + '||'+ link + '}' + strAfter;

    this.setState({value: newStr}, () => {
      elem.selectionStart = newStr.indexOf('{') + 1;
      elem.selectionEnd = newStr.indexOf('||');
      elem.blur();
      elem.focus();
    });
  };

  render() {
    const {limiter, disabled} = this.props;
    return (
      <div>
        <div>
          <Textarea
            value={this.state.value}
            limiter={{
              ...limiter,
              filterSymbol: true
            }}
            disabled={disabled}
            onChange={this.handleChange}
            textRef={(textarea) => { this.textareaElem = textarea; }}
          />
        </div>
        <button
          className="btn"
          onClick={this.insertLink}>
          插入链接
        </button>
      </div>
    );
  }
}

LinkTextarea.propTypes = {
  value: PropTypes.string,
  limiter: PropTypes.shape({
    type: PropTypes.string,
    max: PropTypes.number,
    filterSymbol: PropTypes.bool
  }),
  rules: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

LinkTextarea.defaultProps = {
  disabled: false
};

export default LinkTextarea;