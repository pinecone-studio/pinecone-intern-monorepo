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

export const getArticlesByCategory: QueryResolvers['getArticlesByCategory'] = async (_, { categoryId, quantity }) => {
  try {
    const articles = await ArticleModel.find({ category: categoryId })
      .populate('category')
      .populate('author')
      .limit(quantity);

    return articles;
  } catch (error) {
    throw new GraphQLError('Error in getArticlesByCategory');
  }
};

export const getArticlesByQuantity: QueryResolvers['getArticlesByQuantity'] = async (_, { quantity }) => {
  try {
    const articles = await ArticleModel.find({}).limit(quantity).populate('category').populate('author');

    return articles;
  } catch (error) {
    throw new GraphQLError('Error in getArticlesByQuantity');
  }
};

export const getArticlesByCategoryNoLimit: QueryResolvers['getArticlesByCategoryNoLimit'] = async (_, { categoryId }) => {
  try {
    const articles = await ArticleModel.find({ category: categoryId }).populate('category author');
    return articles;
  } catch (error) {
    throw new GraphQLError('Can not get articles by category (no limit)');
  }
};
