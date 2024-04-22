import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models/article.model';
import { GraphQLError } from 'graphql';

export const getArticlesQuery: QueryResolvers['getArticlesQuery'] = async () => {
  try {
    const articles = await ArticleModel.find({}).populate('category').populate('author');
    return articles;
  } catch (error) {
    console.log(error);

    throw new GraphQLError('Error in get articles query');
  }
};

export const getArticlesByCategory: QueryResolvers['getArticlesByCategory'] = async (_, { categoryId, getAll }) => {
  try {
    const articles = await ArticleModel.find({ category: categoryId })
      .populate('category')
      .populate('author')
      .limit(getAll ? 0 : 4);

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
