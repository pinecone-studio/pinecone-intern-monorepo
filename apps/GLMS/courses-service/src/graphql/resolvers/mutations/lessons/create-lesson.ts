import { CreateLessonInput } from '@/graphql/generated';
import { LessonsModel } from '@/models/lessons';
import { GraphQLError } from 'graphql';

export const createLesson = async (_: unknown, { createInput }: { createInput: CreateLessonInput }) => {
  try {
    const newLesson = await LessonsModel.create({ ...createInput });
    return newLesson;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to create lesson ${message}`);
  }
};
