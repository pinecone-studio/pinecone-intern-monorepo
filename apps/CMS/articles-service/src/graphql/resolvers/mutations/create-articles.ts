import { ArticleModel } from '@/models/articles.model';
import { Article, MutationResolvers } from '@/graphql/generated';

export const createArticle: MutationResolvers['createArticle'] = async (_, { articleInput }) => {
  try {
    const newArticle = await ArticleModel.create(articleInput);
    if (!newArticle) {
      throw new Error('Failed to create article');
    }
    console.log(newArticle);

    return newArticle as Article;
  } catch (error) {
    throw new Error('Failed to create article');
  }
};
