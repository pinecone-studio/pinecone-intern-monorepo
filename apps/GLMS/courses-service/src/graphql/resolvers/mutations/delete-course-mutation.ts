import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/create-course-model';

export const deleteCourse: MutationResolvers['deleteCourse'] = async (_, { _id }) => {
  try {
    const deletedCourse = await courseModel.findByIdAndDelete(_id);
    return deletedCourse?.toObject() ?? null;
  } catch (error) {
    throw new Error('Failed to delete course.');
  }
};
