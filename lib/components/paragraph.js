/* @flow */

import React from 'react';

import type { TextItemsType, RenderTextType } from '../types';

export type ParagraphPropsType = {
  items: TextItemsType,
};

const setup = ({ renderText }: { renderText: RenderTextType, }) => {
  const Paragraph = ({ items }: ParagraphPropsType) =>
    <p>{renderText(items)}</p>;

  return Paragraph;
};

export default setup;
