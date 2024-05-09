import { MutationResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models';
import { errorTypes, graphqlErrorHandler } from '../error';
import { GraphQLError } from 'graphql';

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { _id, title, content, coverPhoto, commentPermission }) => {
  try {
    console.log(_id);

    const article = await ArticleModel.findByIdAndUpdate(_id, { title, content, coverPhoto, commentPermission }, { new: true });

    if (!article) {
      throw graphqlErrorHandler({ message: 'Article not found' }, errorTypes.NOT_FOUND);
    }

    return article;
  } catch (error) {
    console.log(error);
    if (error instanceof GraphQLError) throw error;

    throw graphqlErrorHandler({ message: 'Error updating article' }, errorTypes.BAD_REQUEST);
  }
};
