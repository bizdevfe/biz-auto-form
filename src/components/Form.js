/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单
 */
import React from 'react';
import PropTypes from 'prop-types';

import '../styles/form.less';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || {}
    };
  }

  handleSubmit = (event) => {
    event && event.preventDefault();
    if(this.props.onSubmit){
      console.log(this.state.data);
      this.props.onSubmit(this.state.data);
    }
  };

  handleChange = (name, value) => {
    const data = Object.assign({}, this.state.data, {[name]: value});
    this.setState({ data });
  };

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      const value = child.props.value || this.state.data[child.props.name];
      return React.cloneElement(child, {
        value,
        onChange: this.handleChange
      });
    });
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        {children}
        <div className="form-item">
          <label className="item-title">
          </label>
          <div className="item-con">
            <button
                className="btn"
                type="submit">
              确定
            </button>
          </div>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  onSubmit: PropTypes.func
};

Form.defaultProps = {

};

export default Form;
