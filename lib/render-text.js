/* @flow */

import React from 'react';
import type { ItemType, ItemsType, OptsType } from './types';

const getTextElement = (item: ItemType): string | React.Element<*> => {
  let el = String(item.content || '');

  if (item.mark) {
    el = <mark className={item.markClass}>{el}</mark>;
  }
  if (item.italic) {
    el = <i>{el}</i>;
  }
  if (item.bold) {
    el = <b>{el}</b>;
  }
  if (item.strikethrough) {
    el = <s>{el}</s>;
  }
  if (item.href) {
    el = <a href={item.href}>{el}</a>;
  }

  return el;
};

const setupRenderTextItem = (customTextFormattings) => {
  const renderTextItem = (item: ItemType, index) => {
    if (item.type === 'text') {
      let textElement = getTextElement(item);

      customTextFormattings.forEach(({ property, render }) => {
        if (item[property]) {
          textElement = render(item, textElement);
        }
      });

      return (typeof textElement === 'string' ? textElement : React.cloneElement(
        textElement,
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

export default ({ customTextFormattings = [] }: OptsType) => (items: ItemsType) => {
  const renderedItems = items
    .map(setupRenderTextItem(customTextFormattings));

  return flattenAnchorTags(renderedItems);
};
