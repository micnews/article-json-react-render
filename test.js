/* @flow */
/* eslint-disable import/no-extraneous-dependencies, react/display-name,
  react/prop-types, react/prefer-stateless-function */

import test from 'tapava';
import React from 'react';
import { shallow } from 'enzyme';
import setupArticle from './lib/index';

const renderHtmlString = component => shallow(component).html();

test('embed', (t) => {
  t.plan(2);

  const Article = setupArticle({
    embeds: {
      twitter: (tweet) => {
        t.is(tweet.id, 'twitter-id');
        return <span id={tweet.id} />;
      },
    },
  });
  const items = [{
    type: 'embed',
    embedType: 'twitter',
    id: 'twitter-id',
  }];
  const expected = renderHtmlString(
    <article><figure><span id='twitter-id' /></figure></article>);
  const actual = renderHtmlString(<Article items={items} />);

  t.is(actual, expected);
});

test('unknown embed', (t) => {
  t.plan(1);

  const Article = setupArticle({ embeds: {} });

  const items = [{
    type: 'embed',
    embedType: 'unknown-embed',
  }];
  const expected = renderHtmlString(<article />);
  const actual = renderHtmlString(<Article items={items} />);

  t.is(actual, expected);
});

test('embed can be class component', (t) => {
  t.plan(1);

  class CustomEmbed extends React.Component {
    render() {
      return <span>Custom Embed</span>;
    }
  }

  const Article = setupArticle({
    embeds: {
      custom: CustomEmbed,
    },
  });
  const items = [{
    type: 'embed',
    embedType: 'custom',
  }];
  const expected = renderHtmlString(
    <article><figure><span>Custom Embed</span></figure></article>);
  const actual = renderHtmlString(<Article items={items} />);

  t.is(actual, expected);
});

test('embed with custom figureProps', (t) => {
  t.plan(2);

  const Article = setupArticle({
    embeds: {
      twitter: (tweet) => {
        t.is(tweet.id, 'twitter-id');
        return <span id={tweet.id} />;
      },
    },
  });
  const items = [{
    type: 'embed',
    embedType: 'twitter',
    id: 'twitter-id',
    figureProps: {
      id: 'foo',
    },
  }];
  const expected = renderHtmlString(
    <article>
      <figure id='foo'><span id='twitter-id' /></figure>
    </article>);
  const actual = renderHtmlString(<Article items={items} />);

  t.is(actual, expected);
});

test('embed figureProps.class renders as className', (t) => {
  const Article = setupArticle({
    embeds: { custom: () => <span /> },
  });
  const items = [{
    type: 'embed',
    embedType: 'custom',
    figureProps: {
      class: 'custom-class',
    },
  }];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <figure className='custom-class'>
      <span />
    </figure>
  </article>);

  t.is(actual, expected);
});

test('text elements', (t) => {
  const Article = setupArticle({ embeds: {} });

  const items = [
    {
      type: 'paragraph',
      children: [{ content: 'foo bar', type: 'text' }],
    }, {
      type: 'header1',
      children: [{ content: 'beep boop1', type: 'text' }],
    }, {
      type: 'header2',
      children: [{ content: 'beep boop2', type: 'text' }],
    }, {
      type: 'header3',
      children: [{ content: 'beep boop3', type: 'text' }],
    }, {
      type: 'header4',
      children: [{ content: 'beep boop4', type: 'text' }],
    }, {
      type: 'header5',
      children: [{ content: 'beep boop5', type: 'text' }],
    }, {
      type: 'header6',
      children: [{ content: 'beep boop6', type: 'text' }],
    },
  ];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <p>foo bar</p>
    <h1>beep boop1</h1>
    <h2>beep boop2</h2>
    <h3>beep boop3</h3>
    <h4>beep boop4</h4>
    <h5>beep boop5</h5>
    <h6>beep boop6</h6>
  </article>);

  t.is(actual, expected);
});

test('text and its formattings', (t) => {
  const Article = setupArticle({ embeds: {} });
  const items = [
    {
      type: 'paragraph',
      children: [
        { type: 'text', content: 'foo' },
        { type: 'text', content: 'foz', href: 'http://disney.com' },
        { type: 'text', content: 'fez', italic: true },
        { type: 'text', content: 'fiz', bold: true },
        { type: 'text', content: 'fuz', strikethrough: true },
        { type: 'text', content: 'fyz', mark: true },
        { type: 'text',
          content: 'faz',
          italic: true,
          bold: true,
          mark: true,
          strikethrough: true,
          href: 'http://mic.com' },
      ],
    },
  ];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <p>
      foo
      <a href='http://disney.com'>foz</a>
      <i>fez</i>
      <b>fiz</b>
      <s>fuz</s>
      <mark>fyz</mark>
      <a href='http://mic.com'><s><b><i><mark>faz</mark></i></b></s></a>
    </p>
  </article>);

  t.is(actual, expected);
});

test('text w links should use minimal amount of a-tags', (t) => {
  const Article = setupArticle({ embeds: {} });
  const items = [
    {
      type: 'paragraph',
      children: [
        { type: 'text', content: 'faz', href: 'http://disney.com' },
        { type: 'text', content: 'fez', mark: true, href: 'http://disney.com', markClass: 'hello' },
        { type: 'text', content: 'fiz', href: 'http://disney.com' },
      ],
    }, {
      type: 'paragraph',
      children: [
        { type: 'text', content: 'faz', href: 'http://foo.com' },
        { type: 'text', content: 'fez', mark: true, href: 'http://bar.com', markClass: 'hello' },
        { type: 'text', content: 'fiz', href: 'http://disney.com' },
      ],
    },
  ];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <p>
      <a href='http://disney.com'>faz<mark className='hello'>fez</mark>fiz</a>
    </p>
    <p>
      <a href='http://foo.com'>faz</a>
      <a href='http://bar.com'><mark className='hello'>fez</mark></a>
      <a href='http://disney.com'>fiz</a>
    </p>
  </article>);

  t.is(actual, expected);
});

test('text with no content', (t) => {
  const Article = setupArticle({ embeds: {} });
  const items = [
    'paragraph',
    'header1', 'header2', 'header3', 'header4', 'header5', 'header6',
  ].map(type => ({
    type, children: [],
  }));

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article />);

  t.is(actual, expected);
});

test('text with no children', (t) => {
  const Article = setupArticle({ embeds: {} });
  const items = [
    'paragraph',
    'header1', 'header2', 'header3', 'header4', 'header5', 'header6',
  ].map(type => ({
    type,
  }));

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article />);

  t.is(actual, expected);
});

test('Should render empty mark', (t) => {
  const Article = setupArticle({ embeds: {} });

  const items = [{
    type: 'paragraph',
    children: [{
      type: 'text',
      content: '',
      mark: true,
    }],
  }];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article><p><mark /></p></article>);

  t.is(actual, expected);
});

test('text with no content, opts.renderEmptyTextNodes = true', (t) => {
  const Article = setupArticle({ embeds: {}, renderEmptyTextNodes: true });
  const items = [
    'paragraph',
    'header1', 'header2', 'header3', 'header4', 'header5', 'header6',
  ].map(type => ({
    type, children: [],
  }));

  const actual = renderHtmlString(<Article items={items} />);
  /* eslint-disable jsx-a11y/heading-has-content */
  const expected = renderHtmlString(<article>
    <p />
    <h1 />
    <h2 />
    <h3 />
    <h4 />
    <h5 />
    <h6 />
  </article>);
  /* eslint-enable */

  t.is(actual, expected);
});

test('invalid type', (t) => {
  const Article = setupArticle({ embeds: {} });

  const items = [{
    type: 'invalid-type',
    children: [],
  }];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article />);

  t.is(actual, expected);
});

test('blockquote', (t) => {
  const Article = setupArticle({ embeds: {} });
  const items = [{
    type: 'blockquote',
    pullQuote: false,
    children: [{
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'abc',
      }],
    }, {
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'def',
        bold: true,
      }],
    }],
  }];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(
    <article>
      <blockquote>
        <p>abc</p>
        <p><b>def</b></p>
      </blockquote>
    </article>,
  );

  t.is(actual, expected);
});

test('blockquote pullQuote=true', (t) => {
  const Article = setupArticle({ embeds: {} });
  const items = [{
    type: 'blockquote',
    pullQuote: true,
    children: [{
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'abc',
      }],
    }, {
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'def',
        bold: true,
      }],
    }],
  }];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(
    <article>
      <blockquote className='q'>
        <p>abc</p>
        <p><b>def</b></p>
      </blockquote>
    </article>,
  );

  t.is(actual, expected);
});

test('unkown type', (t) => {
  const Article = setupArticle({ embeds: {} });
  const items = [{
    type: 'whatever',
  }];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article />);

  t.is(actual, expected);
});

test('text node with linebreak, mark & unkown type', (t) => {
  const Article = setupArticle({ embeds: {} });

  const items = [
    {
      type: 'paragraph',
      children: [
        { type: 'text', content: 'foo' },
        { type: 'linebreak' },
        { type: 'unknown' },
        { type: 'text', content: 'foo' },
        { type: 'text', content: 'foz', mark: true },
        { type: 'text', content: 'fiz', mark: true, markClass: 'mark-class' },
        { type: 'text', mark: true },
      ],
    },
  ];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <p>
      foo<br />
      foo
      <mark>foz</mark>
      <mark className='mark-class'>fiz</mark>
      <mark />
    </p>
  </article>);

  t.is(actual, expected);
});

test('embed with caption', (t) => {
  const Article = setupArticle({
    embeds: {
      image: ({ src }) => <img alt='alt-text' src={src} />,
    },
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false,
    }, {
      type: 'text',
      content: 'Author',
      href: 'http://example.com/author',
      italic: false,
      bold: false,
    }],
  }];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <figure>
      <img alt='alt-text' src='http://example.com/image.jpg' />
      <figcaption>
        Source: <a href='http://example.com/author'>Author</a>
      </figcaption>
    </figure>
  </article>);

  t.is(actual, expected);
});

test('custom caption', (t) => {
  const customCaption = data => <figcaption-foo>{data}</figcaption-foo>;
  const Article = setupArticle({
    embeds: {
      image: ({ src }) => <img alt='alt-text' src={src} />,
    },
    customCaption,
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false,
    }, {
      type: 'text',
      content: 'Author',
      href: 'http://example.com/author',
      italic: false,
      bold: false,
    }],
  }];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <figure>
      <img alt='alt-text' src='http://example.com/image.jpg' />
      <figcaption-foo>
        Source: <a href='http://example.com/author'>Author</a>
      </figcaption-foo>
    </figure>
  </article>);

  t.is(actual, expected);
});

test('embed with caption and attribution', (t) => {
  const Article = setupArticle({
    embeds: {
      image: ({ src }) => <img alt='alt-text' src={src} />,
    },
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Image description',
      href: null,
      italic: false,
      bold: false,
    }],
    attribution: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false,
    }, {
      type: 'text',
      content: 'author',
      href: 'http://example.com',
      italic: false,
      bold: false,
    }],
  }];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <figure>
      <img alt='alt-text' src='http://example.com/image.jpg' />
      <figcaption>
        Image description
        <cite>Source: <a href='http://example.com'>author</a></cite>
      </figcaption>
    </figure>
  </article>);

  t.is(actual, expected);
});

test('embed with attribution without link', (t) => {
  const Article = setupArticle({
    embeds: {
      image: ({ src }) => <img alt='alt-text' src={src} />,
    },
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [],
    attribution: [{
      type: 'text',
      content: 'Source',
      href: null,
      italic: false,
      bold: false,
    }],
  }];

  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <figure>
      <img alt='alt-text' src='http://example.com/image.jpg' />
      <figcaption>
        <cite>Source</cite>
      </figcaption>
    </figure>
  </article>);

  t.is(actual, expected);
});

test('customTextFormattings', (t) => {
  const Article = setupArticle({
    embeds: {
      image: ({ src }) => <img alt='alt-text' src={src} />,
    },
    customTextFormattings: [
      {
        property: 'underline',
        render: (item, el) => <span style={{ textDecoration: 'underline' }}>{el}</span>,
      },
    ],
  });

  const items = [{
    type: 'paragraph',
    children: [{
      type: 'text',
      content: 'underlined text',
      underline: true,
    }, {
      type: 'text',
      content: 'regular text',
    }],
  }, {
    type: 'header1',
    children: [{
      type: 'text',
      content: 'underlined text',
      underline: true,
    }],
  }, {
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Image description',
      underline: true,
    }],
    attribution: [{
      type: 'text',
      content: 'Source: ',
      underline: true,
    }, {
      type: 'text',
      content: 'author',
      href: 'http://example.com',
      underline: true,
    }],
  }];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <p><span style={{ textDecoration: 'underline' }}>underlined text</span>regular text</p>
    <h1><span style={{ textDecoration: 'underline' }}>underlined text</span></h1>
    <figure>
      <img alt='alt-text' src='http://example.com/image.jpg' />
      <figcaption>
        <span style={{ textDecoration: 'underline' }}>Image description</span>
        <cite>
          <span style={{ textDecoration: 'underline' }}>Source: </span>
          <span style={{ textDecoration: 'underline' }}><a href='http://example.com'>author</a></span>
        </cite>
      </figcaption>
    </figure>
  </article>);

  t.is(actual, expected);
});

test('customTextFormattings wraps all other formattings', (t) => {
  const renderUnderline = (item, el) => (<span style={{ textDecoration: 'underline' }}>{el}</span>);
  const Article = setupArticle({
    customTextFormattings: [
      {
        property: 'underline',
        render: renderUnderline,
      },
    ],
  });

  const items = [{
    type: 'paragraph',
    children: [{
      type: 'text',
      content: 'content',
      underline: true,
      italic: true,
      bold: true,
      mark: true,
      strikethrough: true,
      href: 'http://mic.com',
    }],
  }];
  const actual = renderHtmlString(<Article items={items} />);
  const expected = renderHtmlString(<article>
    <p>
      <span style={{ textDecoration: 'underline' }}>
        <a href='http://mic.com'><s><b><i><mark>
          content
        </mark></i></b></s></a>
      </span>
    </p>
  </article>);

  t.is(actual, expected);
});

test('articleProps', (t) => {
  const Article = setupArticle({ embeds: {} });

  const articleProps = {
    contentEditable: true,
    className: 'custom-article-class',
  };
  const expected = renderHtmlString(<article {...articleProps} />);
  const actual = renderHtmlString(<Article articleProps={articleProps} items={[]} />);

  t.is(actual, expected);
});
