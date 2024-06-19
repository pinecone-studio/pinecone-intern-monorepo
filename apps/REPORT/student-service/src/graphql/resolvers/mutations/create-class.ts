import { MutationResolvers } from '@/graphql/generated';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError } from 'graphql';

export const createClass: MutationResolvers['createClass'] = async (_, { input }) => {
  try {
    const newClass = await ClassModel.create(input);
    return newClass;
  } catch (error) {
    throw new GraphQLError('Failed to create class');
  }
};
