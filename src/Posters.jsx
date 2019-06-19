import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col } from 'antd';
import { remote } from 'electron';
import fs from 'fs';

const readFile = (filePath) => {
  let content;
  function processFile() {
    console.log(content);
  }
  // First I want to read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }
    content = data;

    // Invoke the next step here however you like
    console.log(content); // Put all of the code here (not the best solution)
    processFile(); // Or put the next step in a function and invoke it
  });
};

const propTypes = {
  value: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line react/require-default-props
  onChange: PropTypes.func,
};
const defaultProps = {
  // value: [],
  onChange: () => {},
};

/**
 * A AntDesign compatible component
 */
export default class Posters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localPaths: props.value, // the local path to store file
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    // console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.onChange(nextSelectedTags, tag, checked);
  }

  handleClick() {
    /**
     * @param {string[]} [localPaths=[]] Is undefined when use not select a file
     */
    const finishSelectFiles = (localPaths = []) => {
      console.log(localPaths);
      this.setState({ localPaths });
      readFile(localPaths[0]);
    };
    // Notes:
    // The Dialog is opened from Electron's main thread.
    // If you want to use the dialog object from a renderer process,
    // remember to access it using the remote
    //
    // For more details about how to use dialog, please see:
    // https://electronjs.org/docs/api/dialog
    remote.dialog.showOpenDialog({ title: 'find posters' }, finishSelectFiles);
  }

  render() {
    return (
      <Row>
        <Col span={20}>
          {this.state.localPaths.map(path => (
            <Input key={path} value={this.state.localPaths} onChange={this.handleChange} />
          ))}
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Button onClick={this.handleClick}>Find image</Button>
        </Col>
      </Row>
    );
  }
}

Posters.propTypes = propTypes;
Posters.defaultProps = defaultProps;
