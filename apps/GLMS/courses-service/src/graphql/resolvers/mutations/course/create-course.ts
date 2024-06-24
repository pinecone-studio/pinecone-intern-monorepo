import { CreateCourseInput } from '@/graphql/generated';
import { CoursesModel } from '@/models/courses';
import { GraphQLError } from 'graphql';

export const createCourse = async (_: unknown, { createInput }: { createInput: CreateCourseInput }) => {
  try {
    const newCourse = await CoursesModel.create({ ...createInput });
    return newCourse;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to create course: ${message}`);
  }
};
