import { articleModel } from '@/models/article.model';

export const getArticles = async () => {
  const articles = await articleModel.find({});

  return articles;
};
