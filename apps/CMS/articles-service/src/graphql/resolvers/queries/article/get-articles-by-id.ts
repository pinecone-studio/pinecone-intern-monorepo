import { QueryResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/articles.model';

export const getArticles: QueryResolvers['getArticles'] = async () => {
  try {
    const articles = await ArticleModel.find();
    if (!articles) {
      throw new GraphQLError('article not found');
    }
    return articles;
  } catch (error) {
    throw new GraphQLError('article not found');
  }
};
