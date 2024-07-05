import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

export const getLessons = async (_: unknown, { courseId }: { courseId: string }) => {
  try {
    const lessons = await LessonsModel.find({ courseId }).populate('courseId');
    return lessons;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get lessons: ${message}`);
  }
};
