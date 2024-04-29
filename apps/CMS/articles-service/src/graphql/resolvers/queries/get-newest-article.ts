import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models';
import { GraphQLError } from 'graphql';

export const getNewestArticle: QueryResolvers['getNewestArticle'] = async () => {
  try {
    const article = await ArticleModel.findOne({}).sort({ publishedAt: -1 }).populate('author').populate('category');

    if (!article) {
      throw new GraphQLError('Error');
    }

    return article;
  } catch (error) {
    throw new GraphQLError('Error in getNewestArticle');
  }
};
