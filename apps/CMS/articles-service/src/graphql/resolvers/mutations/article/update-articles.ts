import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/articles.model';

export const updateArticle: MutationResolvers['updateArticle'] = async (_: unknown, { _id, input }) => {
  try {
    const { ...updateData } = input;
    const updatedArticle = await ArticleModel.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updatedArticle) {
      throw new GraphQLError('Could not find article to update');
    }
    return updatedArticle;
  } catch (error) {
    console.log(error);

    throw new GraphQLError('Could not find article to update');
  }
};
