import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '../../../models/articles.model';

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { input }) => {
  if (!input || typeof input._id !== 'string') {
    throw new GraphQLError('Invalid input: Missing or invalid _id');
  }

  const { _id, ...updateData } = input;

  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedArticle) {
      throw new GraphQLError('Could not find article to update');
    }

    return updatedArticle;
  } catch (e) {
    console.error(e); // Log the actual error for debugging purposes

    throw new GraphQLError('Failed to update article');
  }
};
