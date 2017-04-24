/* @flow */
/* eslint-disable react/display-name */

import React from 'react';
import startswith from 'lodash.startswith';
import setupBlockquote from './components/blockquote';
import type { ParagraphPropsType } from './components/paragraph';
import type { HeaderPropsType } from './components/header';
import type { EmbedPropsType } from './components/embed';
import type { TextItemsType } from './types';

type SetupPropsType = {
  Paragraph: ParagraphPropsType => React.Element<*>,
  Header: HeaderPropsType => React.Element<*>,
  Embed: EmbedPropsType => React.Element<*> | null,
  renderEmptyTextNodes?: boolean,
};

type ElementPropsType = {
  children: TextItemsType,
};

type BlockquotePropsType = {
  pullQuote: boolean,
} & ElementPropsType;

const isText = type => type === 'paragraph' || startswith(type, 'header');

const hasContent = ({ children = [] }) =>
  children.some(child => child.type !== 'linebreak' &&
    ((child.content && child.content.trim()) || child.mark));

const setup = ({ Paragraph, Header, Embed, renderEmptyTextNodes }: SetupPropsType) => {
  const types = {
    blockquote: ({ children, pullQuote }: BlockquotePropsType) =>
      <Blockquote items={children} pullQuote={pullQuote} />,
    embed: item => <Embed {...item} />,
    header1: ({ children }: ElementPropsType) => <Header level={1} items={children} />,
    header2: ({ children }: ElementPropsType) => <Header level={2} items={children} />,
    header3: ({ children }: ElementPropsType) => <Header level={3} items={children} />,
    header4: ({ children }: ElementPropsType) => <Header level={4} items={children} />,
    header5: ({ children }: ElementPropsType) => <Header level={5} items={children} />,
    header6: ({ children }: ElementPropsType) => <Header level={6} items={children} />,
    paragraph: ({ children }: ElementPropsType) => <Paragraph items={children} />,
  };

  const renderItem = (item, index) => {
    const { type } = item;
    const Component = types[type];
    if (!Component || (!renderEmptyTextNodes && isText(type) && !hasContent(item))) {
      return '';
    }

    return <Component {...item} key={index} />;
  };

  const blockList = (items: TextItemsType) => items.map(renderItem);
  const Blockquote = setupBlockquote({ blockList });

  return blockList;
};

export default setup;
