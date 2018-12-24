import React, { Component } from 'react';
import { Input, Button, Table, Icon, message } from 'antd';
import Promise from 'bluebird';
import Nedb from 'nedb';
// import 'antd/dist/antd.css';
import electron from 'electron';

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
  }
  componentDidMount() {
    db.find()
      .execAsync()
      .then((res) => {
        this.setState({ dataSource: res });
      });
  }
  handleUpdate(key, value) {
    this.setState({ [key]: value });
  }
  handleSave() {
    const { code, name } = this.state;
    db.insertAsync({ code, name })
      .then(() => db.find().execAsync())
      .then((res) => {
        message.success('Success saving data.');
        this.setState({ dataSource: res });
      });
  }
  render() {
    return (
      <div>
        <h2>JAV DB</h2>
        {[
          {
            placeholder: 'JAV Code, e.g. "KAWD-941"; "Movie Number" in www.dmm.co.jp',
            key: 'code',
          },
          {
            placeholder: 'JAV Name, e.g. "Temptation Pantyhose Slut OL Satomi Yuria"',
            key: 'name',
          },
        ].map(item => (
          <Input
            key={item.key}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={item.placeholder}
            value={this.state[item.key]}
            onChange={event => this.handleUpdate(item.key, event.target.value)}
            onPressEnter={() => this.handleSave()}
          />
        ))}
        <Button onClick={() => this.handleSave()}>Save</Button>
        <Table rowKey="_id" dataSource={this.state.dataSource} columns={columns} />
      </div>
    );
  }
}
