/**
 * author: KCFE
 * date: 2017/10/12
 * description: 自动生成组件的表单
 */
import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import FieldConverter from './FieldConverter';


class AutoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  getFormFields = (descriptor) => {
    const fields = descriptor.map((item, index) => {
      return (
        <FieldConverter
          {...item}
          key={item.name}
        />
      );
    });
    return fields;
  };

  render() {
    const formItems = this.getFormFields(this.props.descriptor);
    return (
      <Form
        data={this.props.data}
        onSubmit={this.props.onSubmit}
        ref={this.props.formRef}
      >
        {formItems}
      </Form>
    );
  }
}

AutoForm.propTypes = {
  descriptor: PropTypes.arrayOf(PropTypes.object), //表单项描述数组
  data: PropTypes.object, //表单数据
  onSubmit: PropTypes.func,
  formRef: PropTypes.func,
};

AutoForm.defaultProps = {

};

export default AutoForm;
