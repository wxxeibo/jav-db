import PropTypes from 'prop-types';

export const formValuesShape = PropTypes.shape({
  // e.g. SW-473
  javCode: PropTypes.string,
  // e.g. I Want To Rub In Patsupatsu Ass Pantyhose.
  // When I Look At The Muchimuchi Thigh Pantyhose In The Nei
  javName: PropTypes.string,
  // e.g. ['family', 'pantyhose']
  tags: PropTypes.arrayOf(PropTypes.string),
  // e.g. ['https://javfor.me/video/131019/SW-473.html']
  links: PropTypes.arrayOf(PropTypes.string),
  // e.g. Poster image local path
  poster: PropTypes.arrayOf(PropTypes.string),
});

export const dummy = 1;
