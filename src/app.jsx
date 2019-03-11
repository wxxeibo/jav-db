import React, { Component } from 'react';
import { Table, message } from 'antd';
import Promise from 'bluebird';
import Nedb from 'nedb';
// import 'antd/dist/antd.css';
import electron from 'electron';

import CreateForm from './CreateForm';

const app = electron.remote.app;
const userData = app.getAppPath('userData');

const db = new Nedb({
  filename: `${userData}/datafile`,
  autoload: true,
});
const Cursor = db.find().constructor;
Promise.promisifyAll(Nedb.prototype);
Promise.promisifyAll(Cursor.prototype);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      dataSource: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    db.find()
      .execAsync()
      .then((res) => {
        // res = [{
        //   'foo';
        //   'B8QKsq3euaZg5mEn';
        // }]
        this.setState({ dataSource: res });
      });
  }
  handleSubmit(values) {
    this.save(values.javCode, values.javName);
  }
  save(code, name) {
    db.insertAsync({ code, name })
      .then(() => db.find().execAsync())
      .then((res) => {
        message.success('Success saving data.');
        this.setState({ dataSource: res });
      })
      .catch((error) => {
        console.error(`Failed in save data, error: ${error.message}`);
      });
  }
  render() {
    return (
      <div>
        <h2>JAV DB</h2>
        <CreateForm onSubmit={this.handleSubmit} />
        <Table rowKey="_id" dataSource={this.state.dataSource} columns={columns} />
      </div>
    );
  }
}
