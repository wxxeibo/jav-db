import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const CheckableTag = Tag.CheckableTag;

const tags = ['family', 'glasses', 'stockings', 'pantyhose'];

const propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};
const defaultProps = {
  value: [],
  onChange: () => {},
};

export default class CheckableTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: props.value,
    };
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    // console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.onChange(nextSelectedTags, tag, checked);
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div>
        {tags.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

CheckableTags.propTypes = propTypes;
CheckableTags.defaultProps = defaultProps;
