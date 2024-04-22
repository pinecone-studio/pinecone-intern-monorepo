import { reactionModel } from '@/models/reaction.model';
import { QueryResolvers, Reaction } from '@/graphql/generated';
import { GraphQLError } from 'graphql';

export const getReactionsByArticleId: QueryResolvers['getReactionsByArticleId'] = async (_, { articleId }) => {
  try {
    const reactions = await reactionModel.find({ articleId }).populate('category articleId users');
    return reactions as Reaction[];
  } catch (error) {
    throw new GraphQLError('Failed to get reactions for specific article');
  }
};
