import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'antd';

import { formValuesShape } from './typeDef';

const propTypes = {
  values: formValuesShape.isRequired,
  updateRecord: PropTypes.func.isRequired,
};

export default class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleShowDialog = this.handleShowDialog.bind(this);
    this.handleHideDialog = this.handleHideDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleShowDialog() {
    this.setState({ visible: true });
  }
  handleHideDialog() {
    this.setState({ visible: false });
  }
  handleSubmit(values) {
    this.props.updateRecord(values).then(() => {
      this.handleHideDialog();
    });
  }
  render() {
    const { values } = this.props;
    return (
      <div style={{ display: 'inline-block' }}>
        <Button onClick={this.handleShowDialog}>View</Button>
        <Modal
          title="View JAV"
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleHideDialog}
        >
          <Row gutter={16}>
            <Col span={6}>JAC Code</Col>
            <Col span={6}>{values.javCode}</Col>
            <Col span={6}>JAV Tags</Col>
            <Col span={6}>{values.tags.join(', ')}</Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>JAV Name</Col>
            <Col span={18}>{values.javName}</Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

EditDialog.propTypes = propTypes;
