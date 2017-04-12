import React from 'react';

const propTypes = {
  articleProps: Object,
};
const NoopComponent = ({ articleProps }) => <article {...articleProps} />;
NoopComponent.propTypes = propTypes;

export default () => NoopComponent;
