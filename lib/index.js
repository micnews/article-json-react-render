/* @flow */

import setupArticle from './components/article';
import setupBlockList from './block-list';
import setupRenderText from './render-text';
import setupEmbed from './components/embed';
import setupHeader from './components/header';
import setupParagraph from './components/paragraph';
import type { OptsType } from './types';

export default (opts: OptsType) => {
  const renderText = setupRenderText(opts);

  return setupArticle({
    blockList: setupBlockList({
      Embed: setupEmbed({
        embeds: opts.embeds || {},
        customCaption: opts.customCaption,
        renderText,
      }),
      Header: setupHeader({ renderText }),
      Paragraph: setupParagraph({ renderText }),
      renderEmptyTextNodes: opts.renderEmptyTextNodes,
    }),
  });
};
