/* @flow */
/* eslint-disable react/display-name */

import React from 'react';
import startswith from 'lodash.startswith';
import setupBlockquote from './components/blockquote';
import type { ParagraphPropsType } from './components/paragraph';
import type { HeaderPropsType } from './components/header';
import type { EmbedPropsType } from './components/embed';
import type { ItemsType } from './types';

type SetupPropsType = {
  Paragraph: ParagraphPropsType => React.Element<*>,
  Header: HeaderPropsType => React.Element<*>,
  Embed: EmbedPropsType => React.Element<*> | null,
  renderEmptyTextNodes?: boolean,
};

type ELementPropsType = {
  children: ItemsType,
};

type BlockquotePropsType = {
  pullQuote: boolean,
} & ELementPropsType;

const isText = type => type === 'paragraph' || startswith(type, 'header');

const hasContent = ({ children = [] }) =>
  children.some(child => child.type !== 'linebreak' &&
    ((child.content && child.content.trim()) || child.mark));

const setup = ({ Paragraph, Header, Embed, renderEmptyTextNodes }: SetupPropsType) => {
  const types = {
    blockquote: ({ children, pullQuote }: BlockquotePropsType) =>
      <Blockquote items={children} pullQuote={pullQuote} />,
    embed: item => <Embed {...item} />,
    header1: ({ children }: ELementPropsType) => <Header level={1} items={children} />,
    header2: ({ children }: ELementPropsType) => <Header level={2} items={children} />,
    header3: ({ children }: ELementPropsType) => <Header level={3} items={children} />,
    header4: ({ children }: ELementPropsType) => <Header level={4} items={children} />,
    header5: ({ children }: ELementPropsType) => <Header level={5} items={children} />,
    header6: ({ children }: ELementPropsType) => <Header level={6} items={children} />,
    paragraph: ({ children }: ELementPropsType) => <Paragraph items={children} />,
  };

  const renderItem = (item, index) => {
    const { type } = item;
    const Component = types[type];
    if (!Component || (!renderEmptyTextNodes && isText(type) && !hasContent(item))) {
      return '';
    }

    return <Component {...item} key={index} />;
  };

  const blockList = (items: ItemsType) => items.map(renderItem);
  const Blockquote = setupBlockquote({ blockList });

  return blockList;
};

export default setup;
