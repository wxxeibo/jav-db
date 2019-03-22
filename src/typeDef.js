import PropTypes from 'prop-types';

export const formValuesShape = PropTypes.shape({
  javCode: PropTypes.string,
  javName: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
});

export const dummy = 1;
