import { MutationResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models';
import { errorTypes, graphqlErrorHandler } from '../error';
import { GraphQLError } from 'graphql';

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { _id, title, content, category, coverPhoto, commentPermission }) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(_id, { title, content, category, coverPhoto, commentPermission }, { new: true }).populate('category');

    if (!article) {
      throw graphqlErrorHandler({ message: 'Article not found' }, errorTypes.NOT_FOUND);
    }

    return article;
  } catch (error) {
    if (error instanceof GraphQLError) throw error;

    throw graphqlErrorHandler({ message: 'Error updating article' }, errorTypes.BAD_REQUEST);
  }
};
