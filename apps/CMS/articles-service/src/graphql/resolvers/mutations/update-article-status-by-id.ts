import { ArticleModel } from '../../../models/article.model';
import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';

export const updateArticleStatusById: MutationResolvers['updateArticleStatusById'] = async (_, { _id, newStatus }) => {
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(_id, { status: newStatus }, { new: true }).populate('category');
    if (!updatedArticle) {
      throw graphqlErrorHandler({ message: 'could not found article' }, errorTypes.NOT_FOUND);
    }
    return updatedArticle;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'could not update article status' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
