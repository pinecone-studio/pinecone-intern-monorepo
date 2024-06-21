import { CoursesModel } from '@/models/courses';

export const getCourse = async (_: unknown, { _id }: { _id: string }) => {
  const course = await CoursesModel.findById(_id);

  if (!course) {
    throw new Error('Course not found');
  }

  return course;
};
