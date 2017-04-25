/* @flow */

import React from 'react';

export type TextItemType = {
  type: string,
  content?: string,
  children?: Array<TextItemType>,
  mark?: boolean,
  markClass?: string,
  italic?: boolean,
  bold?: boolean,
  strikethrough?: boolean,
  href?: string,
};
export type TextItemsType = Array<TextItemType>;

export type ElementType = string | React.Element<*>;
export type ElementsType = Array<ElementType>;

export type RenderTextType = Array<TextItemType> => ElementsType;
export type BlockListType = Array<TextItemType> => ElementsType;

export type EmbedsType = { [string]: Class<React.Component<*, *, *>> | (Object) => React.Element<*>, };

export type OptsType = {
  embeds?: EmbedsType,
  customCaption?: (ElementsType, ElementsType) => React.Element<*>,
  renderEmptyTextNodes?: boolean,
  customTextFormattings?: Array<{
    property: string,
    render: (TextItemType, string | React.Element<*>) => React.Element<*>,
  }>,
};
