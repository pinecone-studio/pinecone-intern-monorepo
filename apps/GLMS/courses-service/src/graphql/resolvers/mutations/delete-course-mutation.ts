import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/create-course-model';

export const deleteCourse: MutationResolvers['deleteCourse'] = async (_, { _id }) => {
  const deletedCourse = await courseModel.findByIdAndDelete(_id);

  return deletedCourse;
};
