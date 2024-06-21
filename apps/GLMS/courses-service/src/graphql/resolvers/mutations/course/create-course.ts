import { CreateCourseInput } from '@/graphql/generated';
import { CoursesModel } from '@/models/courses';

export const createCourse = async (_: unknown, { createInput }: { createInput: CreateCourseInput }) => {
  try {
    const newCourse = await CoursesModel.create({ ...createInput });
    return newCourse;
  } catch (error) {
    console.error('Error creating course:', error);
    throw new Error('Failed to create course due to an internal error');
  }
};
