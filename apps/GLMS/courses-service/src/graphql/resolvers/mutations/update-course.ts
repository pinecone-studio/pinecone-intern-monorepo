import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/course-model';
import { GraphQLError } from 'graphql';

export const updateCourse: MutationResolvers['updateCourse'] = async (_, { id, courseInput }) => {
  try {
    const updatedCourse = await courseModel.findByIdAndUpdate(id, courseInput, { new: true });
    if (!updatedCourse) {
      throw new GraphQLError('Could not find course');
    }
    return updatedCourse;
  } catch (error) {
    throw new GraphQLError('Failed to update course');
  }
};
