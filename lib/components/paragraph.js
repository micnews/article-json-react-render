/* eslint-disable react/forbid-prop-types */

import React from 'react';

const setup = ({ renderText }) => {
  const Paragraph = ({ items }) => <p>{renderText(items)}</p>;

  Paragraph.propTypes = {
    items: React.PropTypes.array.isRequired,
  };

  return Paragraph;
};

export default setup;
