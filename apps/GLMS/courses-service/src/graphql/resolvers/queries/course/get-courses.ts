import { QueryResolvers } from '@/graphql/generated';
import { CoursesModel } from '@/models/courses';
import { GraphQLError } from 'graphql';

export const getCourses: QueryResolvers['getCourses'] = async () => {
  try {
    const courses = await CoursesModel.find({});
    return courses;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get courses: ${message}`);
  }
};
