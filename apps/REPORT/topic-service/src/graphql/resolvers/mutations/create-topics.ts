import { MutationResolvers } from '@/graphql/generated';
import { TopicsModel } from '@/graphql/models/topic.models';
export const createTopic: MutationResolvers['createTopic'] = async (_, { input }) => {
  try {
    const topic = await TopicsModel.create(input);
    return topic;
  } catch (error) {
    throw new Error('Failed to create topic');
  }
};
