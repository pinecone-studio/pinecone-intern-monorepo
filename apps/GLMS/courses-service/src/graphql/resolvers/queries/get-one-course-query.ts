import { QueryResolvers } from '@/graphql/generated';
import courseModel from '@/model/create-course-model';

export const getCourseById: QueryResolvers['getCourseById'] = async (_, { _id }) => {
  try {
    const course = await courseModel.findById(_id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course.toObject()
  } catch (error) {
    throw new Error('Course not found');
  }
};
