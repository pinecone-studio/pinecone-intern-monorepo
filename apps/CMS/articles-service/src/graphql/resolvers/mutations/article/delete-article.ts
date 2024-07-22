import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models';

export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, { id }) => {
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(id);

    if (!deletedArticle) {
      throw new Error('Failed to delete article');
    }

    return deletedArticle;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw new GraphQLError('Failed to delete article');
  }
};
