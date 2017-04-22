/* @flow */

import React from 'react';

import type { ItemsType, RenderTextType } from '../types';

export type ParagraphPropsType = {
  items: ItemsType,
};

const setup = ({ renderText }: { renderText: RenderTextType, }) => {
  const Paragraph = ({ items }: ParagraphPropsType) =>
    <p>{renderText(items)}</p>;

  return Paragraph;
};

export default setup;
