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

export default ({ customTextFormattings = [] }) => (items) => {
  const TextItem = setupRenderTextItem(customTextFormattings);
  return items
    .map((item, index) => <TextItem {...item} key={index} />)
    .reduce((renderedItems, el) => {
      const prevEl = renderedItems[renderedItems.length - 1];

      // TODO: Make this work with react
      if (prevEl && equalLinks(prevEl, el)) {
      //   prevEl.props.children = prevEl.props.children.concat(el.children);
      //   return renderedItems;
      }

      renderedItems.push(el);
      return renderedItems;
    }, []);
};
