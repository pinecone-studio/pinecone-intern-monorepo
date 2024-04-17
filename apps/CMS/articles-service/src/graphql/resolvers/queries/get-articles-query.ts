import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models/article.model';
import { GraphQLError } from 'graphql';

export const getArticlesQuery: QueryResolvers['getArticlesQuery'] = async () => {
  try {
    const articles = await ArticleModel.find({}).populate('category').populate('author');
    return articles;
  } catch (error) {
    throw new GraphQLError('Error in get articles query');
  }
};
