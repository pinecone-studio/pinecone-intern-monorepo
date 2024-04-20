import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models/article.model';

export const getArticles: QueryResolvers['getArticles'] = async () => {
  const articles = await ArticleModel.find({});

  return articles;
};
