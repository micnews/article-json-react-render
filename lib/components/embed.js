/* @flow */

import React from 'react';

import type { RenderTextType, ElementsType, EmbedsType } from '../types';

type SetupType = {
  embeds: EmbedsType,
  renderText: RenderTextType,
  customCaption?: (ElementsType, ElementsType) => React.Element<*>,
};

export type EmbedPropsType = {
  embedType: string,
  caption: Array<any>,
  attribution?: Array<any>,
  figureProps: Object,
};

const defaultRenderCaption = (text, attribution) => {
  const attributionEl = attribution.length > 0 ? <cite>{attribution}</cite> : '';
  return (<figcaption>
    {text.concat([attributionEl])}
  </figcaption>);
};

const normalizeFigureProps = figureProps => figureProps && Object.assign({}, figureProps, {
  className: figureProps.class,
});

const setup = ({ embeds, customCaption, renderText }: SetupType) => {
  const renderCaption = customCaption || defaultRenderCaption;

  const EmbedWrapper = (props: EmbedPropsType) => {
    const { embedType, caption, attribution, figureProps } = props;
    if (!embeds[embedType]) {
      return null;
    }

    const Embed = embeds[embedType];
    const embed = <Embed {...props} />;
    const captionText = renderText(caption || []);
    const attributionText = renderText(attribution || []);

    const captionElm = (captionText.length > 0 || attributionText.length > 0)
      ? renderCaption(captionText, attributionText)
      : '';

    return <figure {...normalizeFigureProps(figureProps)}>{embed}{captionElm}</figure>;
  };

  return EmbedWrapper;
};

export default setup;
