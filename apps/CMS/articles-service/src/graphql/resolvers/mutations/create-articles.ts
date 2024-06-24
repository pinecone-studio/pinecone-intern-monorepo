import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/articles.model';

export const createArticle: MutationResolvers['createArticle'] = async (_, { articleInput }) => {
  try {
    const newArticle = await ArticleModel.create(articleInput);
    if (!newArticle) {
      throw new GraphQLError('Failed to create article');
    }
    return newArticle;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Failed to create article');
  }
};
