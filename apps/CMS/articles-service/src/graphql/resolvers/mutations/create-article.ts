import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/articles.model';
import { v4 as uuidv4 } from 'uuid';

export const createArticle: MutationResolvers['createArticle'] = async (_, { articleInput }) => {
  if (!articleInput) {
    throw new GraphQLError('articleInput is required');
  }

  try {
    // Generate articleId if not provided
    // const articleId = articleInput.articleId || uuidv4();
    const status = articleInput.status || 'draft';
    const author = articleInput.author || 'unknown author';

    const newArticleInput = {
      ...articleInput,
      // articleId,
      status,
      author,
    };

    console.log('Attempting to create article with input:', newArticleInput);
    const newArticle = await ArticleModel.create(newArticleInput);
    if (!newArticle) {
      console.error('Failed to create article: ArticleModel.create returned null or undefined');
      throw new GraphQLError('Failed to create article');
    }
    console.log('Article created successfully:', newArticle);
    return newArticle;
  } catch (error) {
    console.error('Error occurred while creating article:', error);
    throw new GraphQLError('Failed to create article', {
      extensions: { code: 'INTERNAL_SERVER_ERROR', originalError: error },
    });
  }
};
