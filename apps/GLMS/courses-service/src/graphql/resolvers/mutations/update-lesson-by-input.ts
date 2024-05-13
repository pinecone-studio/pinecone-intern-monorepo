import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/lesson-model';
import { GraphQLError } from 'graphql';

export const updateLessonByInput: MutationResolvers['updateLessonByInput'] = async (_, { id, lessonInput }) => {
  try {
    const updatedLesson = await lessonModel.findByIdAndUpdate(id, lessonInput, { new: true })
    if (!updatedLesson) {
      throw new GraphQLError('Cannot find lesson');
    }
    return updatedLesson;
  } catch (error) {
    throw new GraphQLError('Failed to update lesson');
  }
};
