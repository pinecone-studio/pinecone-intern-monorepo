import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/create-course-model';
export const updateCourse: MutationResolvers['updateCourse'] = async (_, { _id, title, content,thumbnail }) => {
  const updatedCourse = await courseModel.findByIdAndUpdate({ _id }, { title, content,thumbnail }, { new: true });
  if (!updatedCourse) {
    throw new Error('course not found');
  }
  return updatedCourse;
};
