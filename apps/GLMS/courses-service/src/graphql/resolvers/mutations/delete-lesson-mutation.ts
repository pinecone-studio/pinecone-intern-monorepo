import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-course-model';

export const deleteLessons: MutationResolvers['deleteLessons'] = async (_, { _id }) => {
  try {
    const deletedCourse = await lessonModel.findByIdAndDelete(_id);
    return deletedCourse?.toObject() ?? null;
  } catch (error) {
    throw new Error('Failed to delete course.');
  }
};
