import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models/article.model';
import { errorTypes, graphqlErrorHandler } from '../error';

export const getArticlesByStatus: QueryResolvers['getArticlesByStatus'] = async (_, { status }) => {
  try {
    const articles = await ArticleModel.find({ status }).populate('category author');
    if (!articles) {
      throw graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR);
    }

    return articles;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
