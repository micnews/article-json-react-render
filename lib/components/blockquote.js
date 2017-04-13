/* eslint-disable react/forbid-prop-types */

import React from 'react';

const setup = ({ blockList }) => {
  const Blockquote = ({ items, pullQuote }) =>
    <blockquote className={pullQuote ? 'q' : null}>{blockList(items)}</blockquote>;

  Blockquote.propTypes = {
    items: React.PropTypes.array.isRequired,
    pullQuote: React.PropTypes.bool.isRequired,
  };

  return Blockquote;
};

export default setup;
