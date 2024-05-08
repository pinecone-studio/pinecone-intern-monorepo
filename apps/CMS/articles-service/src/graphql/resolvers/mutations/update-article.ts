import { MutationResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models';

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { _id, title, content, category, coverPhoto, commentPermission }) => {
  const article = await ArticleModel.findByIdAndUpdate(_id, { title, content, category, coverPhoto, commentPermission }, { new: true }).populate('category');

  if (!article) {
    throw new Error('Article not found');
  }

  return article;
};
