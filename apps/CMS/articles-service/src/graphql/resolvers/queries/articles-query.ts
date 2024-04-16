import { articleModel } from '@/models/article.model';

export const getArticlesQuery = async () => {
  const articles = await articleModel.find({});

  return articles;
};
