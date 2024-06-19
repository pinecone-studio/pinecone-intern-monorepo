import { MutationResolvers } from '@/graphql/generated';
import { TopicsModel } from '@/graphql/models/topic.models';
import { GraphQLError } from 'graphql';
export const updateTopic: MutationResolvers['updateTopic'] = async (_, { input }) => {
  const { _id, name, description, comments } = input;
  try {
    const topic = await TopicsModel.findByIdAndUpdate(_id, { name, description, comments }, { new: true });
    if (!topic) throw new GraphQLError('Topic not found');
    return topic;
  } catch (error) {
    throw new GraphQLError('Failed to update topic');
  }
};
