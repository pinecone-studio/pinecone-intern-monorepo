import { QueryResolvers } from '@/graphql/generated';
import { CoursesModel } from '@/models/courses';

export const getCourses: QueryResolvers['getCourses'] = async () => {
  const courses = await CoursesModel.find({});

  return courses;
};
