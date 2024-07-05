import { UpdateLessonInput } from '@/graphql/generated';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

export const updateLesson = async (_: unknown, { updateInput }: { updateInput: UpdateLessonInput }) => {
  try {
    const updateLesson = await LessonsModel.findByIdAndUpdate(updateInput.id, updateInput, { new: true, runValidators: true });
    return updateLesson;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to update ${message}`);
  }
};
