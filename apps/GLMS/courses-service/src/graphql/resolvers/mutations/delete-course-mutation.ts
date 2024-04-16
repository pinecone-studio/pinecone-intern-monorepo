import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-lesson-model';

export const deleteLesson: MutationResolvers['deleteLesson'] = async (_, { _id }) => {
  try {
    const deletedLesson = await lessonModel.findByIdAndDelete(_id);
    return deletedLesson?.toObject() ?? null;
  } catch (error) {
    throw new Error('Failed to delete course.');
  }
};
