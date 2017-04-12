import setupArticle from './components/article';

export default () => {
  const blockList = () => {};
  const Article = setupArticle({ blockList });
  return Article;
};
