import { ArticleModel } from '@/models/articles.model';
import { QueryResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';

export const getArticles: QueryResolvers['getArticles'] = async () => {
  try {
    const article = await ArticleModel.find();
    if (!article) {
      throw new GraphQLError('article not found');
    }
    return article;
  } catch (error) {
    throw new GraphQLError('Database error');
  }
};
