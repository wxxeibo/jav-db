import React, { Component } from 'react';
import { Table } from 'antd';
// import 'antd/dist/antd.css';

import JavForm from './JavForm';
import { load, create } from './actions';
import columns from './columns';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      dataSource: [],
      // Edit dialog
      visible: false,
      record: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reloadTable = this.reloadTable.bind(this);
  }
  componentDidMount() {
    this.reloadTable();
  }
  handleSubmit(values) {
    create(values).then(this.reloadTable);
  }
  reloadTable() {
    load().then((res) => {
      // res = [{
      //   'foo';
      //   'B8QKsq3euaZg5mEn';
      // }]
      this.setState({ dataSource: res });
    });
  }
  render() {
    return (
      <div className="app" style={{ margin: '10px' }}>
        <h2>JAV DB</h2>
        <JavForm onSubmit={this.handleSubmit} />
        <Table rowKey="_id" dataSource={this.state.dataSource} columns={columns} />
      </div>
    );
  }
}
