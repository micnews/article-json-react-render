/* @flow */

import React from 'react';

export type ItemType = {
  type: string,
  content?: string,
  children?: Array<ItemType>,
  mark?: boolean,
  markClass?: string,
  italic?: boolean,
  bold?: boolean,
  strikethrough?: boolean,
  href?: string,
};
export type ItemsType = Array<ItemType>;

export type ElementType = string | React.Element<*>;
export type ElementsType = Array<ElementType>;

export type RenderTextType = Array<ItemType> => ElementsType;
export type BlockListType = Array<ItemType> => ElementsType;

export type OptsType = {
  embeds?: { [string]: (Object) => React.Element<*>, },
  customCaption?: (ElementsType, ElementsType) => React.Element<*>,
  renderEmptyTextNodes?: boolean,
  customTextFormattings?: Array<{
    property: string,
    render: (ItemType, string | React.Element<*>) => React.Element<*>,
  }>,
};
