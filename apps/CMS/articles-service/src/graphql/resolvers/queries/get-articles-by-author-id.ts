import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models/article.model';
import { GraphQLError } from 'graphql';

export const getArticlesByAuthorId: QueryResolvers['getArticlesByAuthorId'] = async (_, { _id }) => {
  try {
    return await ArticleModel.find({ author: _id }).populate('author').populate('category');
  } catch (error) {
    throw new GraphQLError('Error in getArticlesByAuthorId');
  }
};
