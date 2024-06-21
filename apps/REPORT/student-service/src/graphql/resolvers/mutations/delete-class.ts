import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError } from 'graphql';
import { MutationResolvers } from '@/graphql/generated';

export const deleteClass: MutationResolvers['deleteClass'] = async (_, { classId }) => {
  try {
    const deletedClass = await ClassModel.findByIdAndDelete(classId);
    if (!deletedClass) {
      throw new GraphQLError('Class not found ');
    }
    return deletedClass;
  } catch (error) {
    throw new GraphQLError('Failed to delete class');
  }
};
