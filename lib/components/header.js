/* @flow */
/* eslint-disable quote-props */

import React from 'react';
import assert from 'assert';

import type { ItemsType, RenderTextType } from '../types';

export type HeaderPropsType = {
  items: ItemsType,
  level: number,
};

// Have to make these number keys into strings for Flow.
// See https://github.com/facebook/flow/issues/380
const headlineTags = {
  '1': 'h1',
  '2': 'h2',
  '3': 'h3',
  '4': 'h4',
  '5': 'h5',
  '6': 'h6',
};

const setup = ({ renderText }: { renderText: RenderTextType, }) => {
  const Header = ({ items, level }: HeaderPropsType) => {
    const inner = renderText(items);

    assert(level >= 1 && level <= 6);

    const Headline = headlineTags[level];
    return <Headline>{inner}</Headline>;
  };

  return Header;
};

export default setup;
