import { MutationDeleteLessonArgs } from '@/graphql/generated';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

export const deleteLesson = async (_: unknown, { id }: MutationDeleteLessonArgs) => {
  try {
    const deleteLesson = await LessonsModel.findByIdAndDelete(id);

    if (!deleteLesson) {
      throw new GraphQLError('Lesson not found');
    }

    return deleteLesson;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to delete a lesson ${message}`);
  }
};
