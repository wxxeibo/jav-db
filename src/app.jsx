import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import Promise from 'bluebird';
import Nedb from 'nedb';
// import 'antd/dist/antd.css';
import electron from 'electron';
import debugModule from 'debug';

const debug = debugModule('jav-db:src/app.jsx');

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
      name: '',
      dataSource: [],
    };
  }
  componentDidMount() {
    db.find()
      .execAsync()
      .then((res) => {
        this.setState({ dataSource: res });
      });
  }
  handleUpdate(name) {
    this.setState({ name });
  }
  handleSave() {
    const { name } = this.state;
    db.insertAsync({ name })
      .then(() => db.find().execAsync())
      .then((res) => {
        this.setState({ dataSource: res });
      });
  }
  render() {
    debug('render()', this.props, this.state);
    return (
      <div>
        <h2>Welcome to React!</h2>
        <Input
          value={this.state.name}
          onChange={event => this.handleUpdate(event.target.value)}
          onPressEnter={() => this.handleSave()}
        />
        <Button onClick={() => this.handleSave()}>Save</Button>
        <Table rowKey="_id" dataSource={this.state.dataSource} columns={columns} />
      </div>
    );
  }
}
