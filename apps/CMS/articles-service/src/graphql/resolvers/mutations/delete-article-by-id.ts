import { MutationResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models';
import { errorTypes, graphqlErrorHandler } from '../error';

export const deleteArticleById: MutationResolvers['deleteArticleById'] = async (_, { _id }) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(_id);

    if (!article) {
      return graphqlErrorHandler({ message: 'Any article found' }, errorTypes.NOT_FOUND);
    }

    return { message: `${article.title} deleted` };
  } catch (error) {
    return graphqlErrorHandler({ message: 'could not delete article' }, errorTypes.BAD_REQUEST);
  }
};
