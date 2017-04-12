/* eslint-disable react/forbid-prop-types, react/display-name */

import React from 'react';
import startswith from 'lodash.startswith';
import setupBlockquote from './components/blockquote';

const isText = type => type === 'paragraph' || startswith(type, 'header');

const hasContent = ({ children }) =>
  children.some(child => (child.type !== 'linebreak') &&
    ((child.content && child.content.trim()) || child.mark));

const setup = ({ Paragraph, Header, Embed, renderEmptyTextNodes }) => {
  const types = {
    blockquote: ({ children, pullQuote }) => <Blockquote items={children} pullQuote={pullQuote} />,
    embed: item => (Embed.test(item) ? <Embed {...item} /> : ''),
    header1: ({ children }) => <Header level={1} items={children} />,
    header2: ({ children }) => <Header level={2} items={children} />,
    header3: ({ children }) => <Header level={3} items={children} />,
    header4: ({ children }) => <Header level={4} items={children} />,
    header5: ({ children }) => <Header level={5} items={children} />,
    header6: ({ children }) => <Header level={6} items={children} />,
    paragraph: ({ children }) => <Paragraph items={children} />,
  };

  types.blockquote.propTypes = {
    children: React.PropTypes.array.isRequired,
    pullQuote: React.PropTypes.bool,
  };
  types.header1.propTypes =
  types.header2.propTypes =
  types.header3.propTypes =
  types.header4.propTypes =
  types.header5.propTypes =
  types.header6.propTypes =
  types.paragraph.propTypes = {
    children: React.PropTypes.array.isRequired,
  };

  const renderItem = (item, index) => {
    const { type } = item;
    const Component = types[type];
    if (!Component || (!renderEmptyTextNodes && isText(type) && !hasContent(item))) {
      return '';
    }

    return <Component {...item} key={index} />;
  };

  const blockList = items => items.map(renderItem);
  const Blockquote = setupBlockquote({ blockList });

  return blockList;
};

export default setup;
