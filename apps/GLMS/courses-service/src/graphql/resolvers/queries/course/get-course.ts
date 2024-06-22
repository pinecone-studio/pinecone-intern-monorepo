import { QueryResolvers } from '@/graphql/generated';
import { CoursesModel } from '@/models/courses';
import { GraphQLError } from 'graphql';

export const getCourse: QueryResolvers['getCourse'] = async (_: unknown, { _id }: { _id: string }) => {
  try {
    const course = await CoursesModel.findById(_id);

    if (!course) {
      throw new GraphQLError('Course not found');
    }

    return course;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get course: ${message}`);
  }
};
