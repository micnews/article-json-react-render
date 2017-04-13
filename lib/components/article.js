/* eslint-disable react/forbid-prop-types */
import React from 'react';

const setup = ({ blockList }) => {
  const Article = ({ items, articleProps }) =>
    <article {...articleProps}>{blockList(items)}</article>;

  Article.propTypes = {
    items: React.PropTypes.array.isRequired,
    articleProps: React.PropTypes.object,
  };

  return Article;
};

export default setup;
