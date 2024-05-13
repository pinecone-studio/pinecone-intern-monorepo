import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/course-model';
import { GraphQLError } from 'graphql';

export const updateCourseStatus: MutationResolvers['updateCourseStatus'] = async (_, { id, status }) => {
  try {
    const updatedCourseStatus = await courseModel.findByIdAndUpdate(id, status: "Архив" );
    if (!updatedCourseStatus) {
      throw new GraphQLError('Could not find course');
    }
    return updatedCourseStatus;
  } catch (error) {
    throw new GraphQLError('Failed to update course');
  }
};
