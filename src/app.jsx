import React, { Component } from 'react';
import { Table, Popconfirm, Button } from 'antd';
// import 'antd/dist/antd.css';

import CreateForm from './CreateForm';
import { load, save, remove } from './actions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      dataSource: [],
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Code',
        dataIndex: 'javCode',
        key: 'javCode',
      },
      {
        title: 'Name',
        dataIndex: 'javName',
        key: 'javName',
      },
      {
        title: 'Actions',
        dataIndex: '_id',
        key: 'actions',
        render: id => (
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => remove(id).then(this.reloadTable)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        ),
      },
    ];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reloadTable = this.reloadTable.bind(this);
  }
  componentDidMount() {
    this.reloadTable();
  }
  handleSubmit(values) {
    save(values.javCode, values.javName).then(this.reloadTable);
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
      <div>
        <h2>JAV DB</h2>
        <CreateForm onSubmit={this.handleSubmit} />
        <Table rowKey="_id" dataSource={this.state.dataSource} columns={this.columns} />
      </div>
    );
  }
}
