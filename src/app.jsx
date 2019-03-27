import React, { Component } from 'react';
import { Table, Popconfirm, Button } from 'antd';
// import 'antd/dist/antd.css';

import JavForm from './JavForm';
import EditDialog from './EditDialog';
import { load, create, updateById, remove } from './actions';

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
    this.columns = [
      // {
      //   title: 'ID',
      //   dataIndex: '_id',
      //   key: '_id',
      // },
      {
        title: 'Code',
        dataIndex: 'javCode',
        key: 'javCode',
        width: 150,
      },
      {
        title: 'Name',
        dataIndex: 'javName',
        key: 'javName',
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        width: 100,
        render: tags => tags.join(', '),
      },
      {
        title: 'Actions',
        dataIndex: '_id',
        key: 'actions',
        width: 200,
        render: (id, record) => {
          const updateRecord = values => updateById(id, values).then(this.reloadTable);
          return [
            <EditDialog key="edit-btn" values={record} updateRecord={updateRecord}>
              <Button>Edit</Button>
            </EditDialog>,
            ' ',
            <Popconfirm
              key="delete-btn"
              title="Are you sure delete this task?"
              onConfirm={() => remove(id).then(this.reloadTable)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>,
          ];
        },
      },
    ];
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
        <Table rowKey="_id" dataSource={this.state.dataSource} columns={this.columns} />
      </div>
    );
  }
}
