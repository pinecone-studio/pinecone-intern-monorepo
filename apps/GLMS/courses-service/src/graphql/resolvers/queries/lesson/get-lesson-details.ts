import { QueryResolvers } from '@/graphql/generated';
import { LessonsModel } from '@/models/lessons';
import { GraphQLError } from 'graphql';

export const getLessonDetails: QueryResolvers['getLessonDetails'] = async (_, { id }: { id: string }) => {
  try {
    const lessonDetails = await LessonsModel.findById(id);

    if (!lessonDetails) {
      throw new GraphQLError('Lesson not found');
    }

    return lessonDetails;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get course: ${message}`);
  }
};
