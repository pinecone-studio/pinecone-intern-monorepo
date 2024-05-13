import { Course, MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/course-model';
import { GraphQLError } from 'graphql';

export const updateCourse: MutationResolvers['updateCourse'] = async (_, { id }) => {
  try {
    const updatedCourse = await courseModel.findByIdAndUpdate(id, { status: 'Aрхив' }).populate<Course>('course');
    if (!updatedCourse) {
      throw new GraphQLError('Cannot find Course');
    }
    return updatedCourse;
  } catch (error) {
    throw new GraphQLError('An sunknown error occurred');
  }
};
