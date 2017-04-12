/* eslint-disable react/forbid-prop-types */

import React from 'react';

const defaultRenderCaption = (text, attribution) => {
  const attributionEl = attribution.length > 0 ? <cite>{attribution}</cite> : '';
  return (<figcaption>
    {text.concat([attributionEl])}
  </figcaption>);
};

const setup = ({ embeds, customCaption, renderText }) => {
  const renderCaption = customCaption || defaultRenderCaption;

  const Embed = (props) => {
    const { embedType, caption, attribution, figureProps } = props;
    const embed = embeds[embedType] && embeds[embedType](props);
    const captionText = renderText(caption || []);
    const attributionText = renderText(attribution || []);

    const captionElm = (captionText.length > 0 || attributionText.length > 0)
      ? renderCaption(captionText, attributionText)
      : '';

    return <figure {...figureProps}>{embed}{captionElm}</figure>;
  };
  Embed.test = ({ embedType }) => embeds[embedType];
  Embed.propTypes = {
    embedType: React.PropTypes.string.isRequired,
    caption: React.PropTypes.array,
    attribution: React.PropTypes.array,
    figureProps: React.PropTypes.object,
  };

  return Embed;
};

export default setup;
