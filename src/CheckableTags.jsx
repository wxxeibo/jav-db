import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const CheckableTag = Tag.CheckableTag;

const tags = ['family', 'glasses', 'stockings', 'pantyhose'];

const propTypes = {
  /**
   * Fixed the antd warning, but also need to ignore the eslint warning
   */
  value: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line react/require-default-props
  onChange: PropTypes.func,
};
const defaultProps = {
  /**
   * Fix warning from antd:
   * ```
   * Warning: `getFieldDecorator` will override `value`,
   * so please don't set `value` directly and use `setFieldsValue` to set it.
   * ```
   * Instead of setting default value here, please set the default value in
   * the `initialValue` of parent AntDesign form component
   */
  // value: [],
  onChange: () => {},
};

/**
 * A AntDesign compatible component
 */
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
