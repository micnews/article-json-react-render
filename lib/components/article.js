/* @flow */

import React from 'react';

import type { ItemsType, BlockListType } from '../types';

type PropsType = {
  items: ItemsType,
  articleProps?: Object,
};

const setup = ({ blockList }: { blockList: BlockListType, }) => {
  const Article = ({ items, articleProps = {} }: PropsType) =>
    <article {...articleProps}>{blockList(items)}</article>;

  return Article;
};

export default setup;
