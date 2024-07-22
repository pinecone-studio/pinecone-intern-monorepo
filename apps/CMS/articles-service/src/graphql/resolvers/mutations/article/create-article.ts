import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/article.model';
import { CategoryModel } from '@/models/category.model';

export const createArticle: MutationResolvers['createArticle'] = async (_, { articleInput }) => {
  try {
    let category = await CategoryModel.findOne({ name: articleInput?.category });

    if (!category) {
      category = await CategoryModel.create({ name: articleInput?.category });
    }
    console.log(category);
    const newArticleData = {
      ...articleInput,
      category: [category],
    };

    const newArticle = await ArticleModel.create(newArticleData);

    if (!newArticle) {
      throw new Error('Failed to create article');
    }
    console.log(newArticle);

    return newArticle;
  } catch (error) {
    console.error('Error creating article:', error);
    throw new GraphQLError('Failed to create article');
  }
};
