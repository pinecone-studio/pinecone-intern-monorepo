import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../generated';
import courseModel from '@/model/course-model';

export const deleteCourse: MutationResolvers['deleteCourse'] = async (_, { id }) => {
  try {
    const deletedCourse = await courseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      throw new GraphQLError('Cannot find course');
    }
    return deletedCourse;
  } catch (error) {
    throw new GraphQLError('Delete course failed');
  }
};
