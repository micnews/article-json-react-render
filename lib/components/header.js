/* eslint-disable react/forbid-prop-types */

import React from 'react';
import assert from 'assert';

const headlineTags = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const setup = ({ renderText }) => {
  const Header = ({ items, level }) => {
    const inner = renderText(items);

    assert(level >= 1 && level <= 6);

    const Headline = headlineTags[level];
    return <Headline>{inner}</Headline>;
  };

  Header.propTypes = {
    items: React.PropTypes.array.isRequired,
    level: React.PropTypes.number.isRequired,
  };

  return Header;
};

export default setup;
