import { CreateLessonInput } from '@/graphql/generated';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

export const createLesson = async (_: unknown, { createInput }: { createInput: CreateLessonInput }) => {
  try {
    const newLesson = await LessonsModel.create({ ...createInput });

    const populatedLesson = await LessonsModel.findById(newLesson._id).populate({
      path: 'courseId',
      model: 'GLMS-Courses',
    });

    return populatedLesson;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to create lesson: ${message}`);
  }
};
