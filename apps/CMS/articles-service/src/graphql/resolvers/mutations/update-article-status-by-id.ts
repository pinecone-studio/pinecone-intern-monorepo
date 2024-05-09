import { ArticleModel } from '../../../models/article.model';
import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';

export const updateArticleStatusById: MutationResolvers['updateArticleStatusById'] = async (_, { _id, newStatus }) => {
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(_id, { status: newStatus }, { new: true }).populate('category');
    console.log(updatedArticle);

    if (!updatedArticle) {
      throw graphqlErrorHandler({ message: 'could not found article' }, errorTypes.INTERVAL_SERVER_ERROR);
    }
    return updatedArticle;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'could not update article status' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
