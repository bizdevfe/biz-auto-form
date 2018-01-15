/**
 * author: KCFE
 * date: 2017/10/12
 * description: 表单
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';
import FieldConverter from './FieldConverter';


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
    const props = this.props;
    const formData = props.data || {};
    const formItems = React.Children.map(props.children, (child) => {
      const value = formData[child.props.name];
      const refKey = child.type === FieldConverter ? 'fieldRef' : 'ref';
      return React.cloneElement(child, {
        value,
        labelWidth: child.props.labelWidth || props.labelWidth,
        [refKey]: (item) => {this.items[child.props.name] = item;}
      });
    });
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        {formItems}
        <div className="form-item">
          <div className="item-con" style={{marginLeft: props.labelWidth + 10}}>
            <Button htmlType="submit">
              保存
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  labelWidth: PropTypes.number,
  children: PropTypes.node,
  data: PropTypes.object,
  onSubmit: PropTypes.func
};

Form.defaultProps = {
  labelWidth: 140
};

export default Form;
