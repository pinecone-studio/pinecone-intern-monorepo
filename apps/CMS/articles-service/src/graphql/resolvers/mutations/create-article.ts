import { ArticleModel } from '../../../models/article.model';
import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';

export const createArticle: MutationResolvers['createArticle'] = async (_, { articleInput }) => {
  const { title, coverPhoto, content, author, category, status, slug, commentPermission } = articleInput;
  try {
    const newArticle = await ArticleModel.create({ title, coverPhoto, content, author, category, status, slug, commentPermission });
    return newArticle;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'cannot created article' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
