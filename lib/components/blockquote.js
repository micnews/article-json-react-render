/* @flow */

import React from 'react';

import type { ItemsType, BlockListType } from '../types';

type PropsType = {
  items: ItemsType,
  pullQuote?: boolean,
};

const setup = ({ blockList }: { blockList: BlockListType }) => {
  const Blockquote = ({ items, pullQuote }: PropsType) =>
    <blockquote className={pullQuote ? 'q' : null}>{blockList(items)}</blockquote>;

  return Blockquote;
};

export default setup;
