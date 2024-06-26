import { QueryResolvers } from '@/graphql/generated';
import { LessonsModel } from '@/models/lessons';
import { GraphQLError } from 'graphql';

export const getLessons: QueryResolvers['getLessons'] = async (_, { courseId }: { courseId: string }) => {
  try {
    const lessons = await LessonsModel.find({ courseId });
    return lessons;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get courses: ${message}`);
  }
};
