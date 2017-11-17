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
    this.items = {};
  }

  handleSubmit = (event) => {
    event && event.preventDefault();
    if( !this.validate() ){
      return;
    }
    if(this.props.onSubmit){
      const values = this.getValues();
      this.props.onSubmit(values);
    }
  };

  getValues = () => {
    const values = {};
    Object.keys(this.items).forEach((key) => {
      const value = this.items[key].getValue();
      if(value){
        Object.assign(values, {[key]: value});
      }
    });
    return values;
  };

  validate = () => {
    return Object.keys(this.items).reduce((suc, key) => {
      const valid = this.items[key].validate();
      return suc && valid;
    }, true);
  };

  render() {
    const formData = this.props.data || {};
    const formItems = React.Children.map(this.props.children, (child) => {
      const value = formData[child.props.name];
      return React.cloneElement(child, {
        value,
        ref: (item) => {this.items[child.props.name] = item;}
      });
    });
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        {formItems}
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
