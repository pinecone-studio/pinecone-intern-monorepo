import { MutationResolvers } from '@/graphql/generated';
import { TopicsModel } from '@/graphql/models/topic.models';
import { GraphQLError } from 'graphql';

export const deleteTopic: MutationResolvers['deleteTopic'] = async (_, { topicId }) => {
  try {
    const deletedTopic = await TopicsModel.findByIdAndDelete(topicId);
    if (!deletedTopic) throw new GraphQLError('Topic not found');
    return deletedTopic;
  } catch (error) {
    throw new GraphQLError('Failed to delete topic');
  }
};
