/* @flow */

import React from 'react';

import type { TextItemsType, BlockListType } from '../types';

type PropsType = {
  items: TextItemsType,
  articleProps?: Object,
};

const setup = ({ blockList }: { blockList: BlockListType, }) => {
  const Article = ({ items, articleProps = {} }: PropsType) =>
    <article {...articleProps}>{blockList(items)}</article>;

  return Article;
};

export default setup;
