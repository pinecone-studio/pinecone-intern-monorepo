import { QueryResolvers } from '@/graphql/generated';
import { TopicsModel } from '@/graphql/models/topic.models';
import { GraphQLError } from 'graphql';

export const getTopics: QueryResolvers['getTopics'] = async () => {
  try {
    const topics = await TopicsModel.find();
    if (!topics) throw new GraphQLError('No topics found');
    return topics;
  } catch (error) {
    throw new GraphQLError('Error getting topics');
  }
};
