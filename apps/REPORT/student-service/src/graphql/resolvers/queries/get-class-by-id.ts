import { QueryResolvers } from '@/graphql/generated';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError } from 'graphql';

export const getClassById: QueryResolvers['getClassById'] = async (_, { classId }) => {
  try {
    const foundClass = await ClassModel.findById(classId);
    if (!foundClass) {
      throw new GraphQLError('Class not found');
    }
    return foundClass;
  } catch (error) {
    throw new GraphQLError('Error occured while fetching class');
  }
};
