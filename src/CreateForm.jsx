import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const javCodeError = isFieldTouched('javCode') && getFieldError('javCode');
    const javNameError = isFieldTouched('javName') && getFieldError('javName');
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={javCodeError ? 'error' : ''} help={javCodeError || ''}>
          {getFieldDecorator('javCode', {
            rules: [{ required: true, message: 'Please input JAV Code!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={'JAV Code, e.g. "KAWD-941"; "Movie Number" in www.dmm.co.jp'}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={javNameError ? 'error' : ''} help={javNameError || ''}>
          {getFieldDecorator('javName', {
            rules: [{ required: true, message: 'Please input JAV Name!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={'JAV Name, e.g. "Temptation Pantyhose Slut OL Satomi Yuria"'}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

CreateForm.propTypes = propTypes;

export default Form.create({ name: 'horizontal_login' })(CreateForm);
