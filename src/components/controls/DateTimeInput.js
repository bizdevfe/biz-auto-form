/**
 * author: KCFE
 * date: 2017/10/12
 * description: 日期时间输入
 */
import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/zh-cn';

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import '../../styles/input.less';

const now = moment();
now.locale('zh-cn').utcOffset(8);

const format = 'YYYY-MM-DD HH:mm:ss';
const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}

function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf();  // can not select days before today
}

class DateTimeInput extends React.Component {
  constructor(props) {
    super(props);
    let value = null;
    if(props.value){
      value = moment(props.value, format)
    }
    this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value
    };
  }

  handleChange = (value) => {
    console.log('DatePicker change: ', (value && value.format(format)));
    this.setState({
      value,
    });
    const {onChange} = this.props;
    if (onChange) {
      onChange(value && value.format(getFormat(this.state.showTime)) || '');
    }
  };

  render() {
    const state = this.state;
    const calendar = (<Calendar
      locale={zhCN}
      style={{ zIndex: 1000 }}
      dateInputPlaceholder="请输入日期时间"
      formatter={getFormat(state.showTime)}
      timePicker={state.showTime ? timePickerElement : null}
      defaultValue={now}
      showDateInput={state.showDateInput}
      disabledDate={disabledDate}
    />);
    return (
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block',
        lineHeight: 1.5
      }}
      >
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.handleChange}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0">
                  <input
                    placeholder="请选择日期时间"
                    className="input"
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    value={value && value.format(getFormat(state.showTime)) || ''}
                  />
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    );
  }
}

DateTimeInput.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

DateTimeInput.defaultProps = {
  disabled: false
};

export default DateTimeInput;