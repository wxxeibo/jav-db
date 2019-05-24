import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import _ from 'lodash';

export default class DynamicFieldSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
    };
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
  }
  remove(index) {
    this.setState(state => ({ keys: state.keys.filter(key => key !== index) }));
  }
  add() {
    this.setState((state) => {
      let nextKey = 0;
      if (state.keys.length !== 0) {
        nextKey = _.last(state.keys) + 1;
      }
      return { keys: state.keys.concat(nextKey) };
    });
  }

  render() {
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const formItems = this.state.keys.map((link, index) => (
      <div key={link}>
        <Input
          placeholder="passenger name"
          style={{ width: '60%', marginRight: 8 }}
          value={link}
          onChange={this.props.onChange}
        />
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={this.state.keys.length === 1}
          onClick={() => this.remove(index)}
        />
      </div>
    ));
    return (
      <div>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>
      </div>
    );
  }
}
