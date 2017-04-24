/* @flow */

import React from 'react';
import type { TextItemType, TextItemsType, OptsType } from './types';

const setupRenderTextItem = (customTextFormattings) => {
  const renderTextItem = (item: TextItemType, index) => {
    if (item.type === 'text') {
      let el: string | React.Element<*> = String(item.content || '');

      el = item.mark ? <mark className={item.markClass}>{el}</mark> : el;
      el = item.italic ? <i>{el}</i> : el;
      el = item.bold ? <b>{el}</b> : el;
      el = item.strikethrough ? <s>{el}</s> : el;
      el = item.href ? <a href={item.href}>{el}</a> : el;

      customTextFormattings.forEach(({ property, render }) => {
        if (item[property]) {
          el = render(item, el);
        }
      });

      return (typeof el === 'string' ? el : React.cloneElement(
        el,
        { key: index },
      ));
    }

    if (item.type === 'linebreak') {
      return <br key={index} />;
    }

    return '';
  };

  return renderTextItem;
};

const equalLinks = (el1, el2) =>
  el1.type === 'a' && el2.type === 'a' && el1.props.href === el2.props.href;

const flattenAnchorTags = (items) => {
  const flattenedItems = [];
  let prevChild;

  items.forEach((currentChild) => {
    if (
      prevChild &&
      typeof prevChild !== 'string' &&
      typeof currentChild !== 'string' &&
      equalLinks(prevChild, currentChild)
    ) {
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

export default ({ customTextFormattings = [] }: OptsType) => (items: TextItemsType) => {
  const renderedItems = items
    .map(setupRenderTextItem(customTextFormattings));

  return flattenAnchorTags(renderedItems);
};
