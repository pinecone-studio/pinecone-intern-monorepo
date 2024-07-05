import { QueryResolvers } from '@/graphql/generated';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

export const getLessonDetails: QueryResolvers['getLessonDetails'] = async (_: unknown, { _id }: { _id: string }) => {
  try {
    const lessonDetails = await LessonsModel.findById(_id).populate({
      path: 'courseId',
      model: 'GLMS-Courses',
    });

    if (!lessonDetails) {
      throw new GraphQLError('Lesson not found');
    }

    return lessonDetails;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get course: ${message}`);
  }
};
