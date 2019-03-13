import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import { formValuesShape } from './typeDef';
import CreateForm from './CreateForm';

const propTypes = {
  children: React.PropTypes.node.isRequired,
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
    const button = React.Children.only(this.props.children);
    const newButton = React.cloneElement(button, { onClick: this.handleShowDialog });
    return (
      <div style={{ display: 'inline-block' }}>
        {newButton}
        <Modal
          title="Edit JAV"
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleHideDialog}
        >
          <CreateForm values={this.props.values} onSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

EditDialog.propTypes = propTypes;
