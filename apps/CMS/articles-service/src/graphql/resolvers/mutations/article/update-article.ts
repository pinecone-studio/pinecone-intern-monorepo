import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models';
import { CategoryModel } from '@/models/category.model';

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { id, articleInput }) => {
  try {
    let category = await CategoryModel.findOne({ name: articleInput.category });

    if (!category) {
      category = await CategoryModel.create({ name: articleInput.category });
    }

    const updatedArticleData = {
      ...articleInput,
      category: [category],
    };

    const updatedArticle = await ArticleModel.findByIdAndUpdate(id, updatedArticleData, { new: true });

    if (!updatedArticle) {
      throw new Error('Failed to update article');
    }

    return updatedArticle;
  } catch (error) {
    console.error('Error updating article:', error);
    throw new GraphQLError('Failed to update article');
  }
};
