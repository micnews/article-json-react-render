import React from 'react';

const setupRenderTextItem = (customTextFormattings) => {
  const RenderTextItem = (item) => {
    if (item.type === 'text') {
      let el = String(item.content || '');
      el = item.mark ? <mark className={item.markClass || null}>{el}</mark> : el;
      el = item.italic ? <i>{el}</i> : el;
      el = item.bold ? <b>{el}</b> : el;
      el = item.strikethrough ? <s>{el}</s> : el;
      el = item.href ? <a href={item.href}>{el}</a> : el;

      customTextFormattings.forEach(({ property, render }) => {
        if (item[property]) {
          el = render(item, el);
        }
      });

      return el;
    }

    if (item.type === 'linebreak') {
      return <br />;
    }

    return '';
  };

  return RenderTextItem;
};

const equalLinks = (el1, el2) =>
  el1.type === 'a' && el2.type === 'a' && el1.props.href === el2.props.href;

const flattenAnchorTags = (items) => {
  const flattenedItems = [];
  let prevChild = null;

  React.Children.forEach(items, (currentChild) => {
    if (prevChild && equalLinks(prevChild, currentChild)) {
      const concatenatedChild = (<a {...currentChild.props}>
        {[...prevChild.props.children, currentChild.props.children]}
      </a>);
      prevChild = concatenatedChild;
    } else {
      if (prevChild) {
        flattenedItems.push(prevChild);
      }

      prevChild = currentChild;
    }
  });

  if (prevChild) {
    flattenedItems.push(prevChild);
  }

  return flattenedItems;
};

export default ({ customTextFormattings = [] }) => (items) => {
  const renderedItems = items
    .map(setupRenderTextItem(customTextFormattings));

  return flattenAnchorTags(renderedItems);
};
