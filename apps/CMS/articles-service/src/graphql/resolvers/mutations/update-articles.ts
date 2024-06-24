import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { ArticleModel } from '@/models/articles.model';

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { input }) => {
  validateInput(input);

  const { _id, ...updateData } = input;

  try {
    // Update article
    const updatedArticle = await ArticleModel.findByIdAndUpdate(_id, updateData, { new: true });

    // Handle article not found
    handleArticleNotFound(updatedArticle);

    return updatedArticle;
  } catch (error) {
    console.error(error);
    throw new GraphQLError('Could not find article to update');
  }
};

function validateInput(input): void {
  if (!input || typeof input._id !== 'string') {
    throw new GraphQLError('Invalid input: Missing or invalid _id');
  }
}

function handleArticleNotFound(article): void {
  if (!article) {
    throw new GraphQLError('Could not find article to update');
  }
}
