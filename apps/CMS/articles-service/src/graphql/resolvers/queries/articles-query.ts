import { QueryResolvers } from '@/graphql/generated';
import { articleModel } from '@/models/article.model';

export const getArticles: QueryResolvers['getArticles'] = async () => {
  const articles = await articleModel.find({});

  return articles;
};
