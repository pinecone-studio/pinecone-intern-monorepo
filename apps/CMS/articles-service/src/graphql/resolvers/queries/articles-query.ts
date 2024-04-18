import { articleModel } from '@/models/article.model';

export const articles = async () => {
  const getArticles = await articleModel.find({});

  return getArticles;
};
