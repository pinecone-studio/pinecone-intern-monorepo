import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../generated';
import lessonModel from '@/model/lesson-model';

export const deleteLesson: MutationResolvers['deleteLesson'] = async (_, { id }) => {
  try {
    const deletedLesson = await lessonModel.findByIdAndDelete(id);
    if (!deletedLesson) {
      throw new GraphQLError ("Cannot find lesson");
    }
    return deletedLesson;
  } catch (error) {
    throw new GraphQLError("Delete lesson failed");
  }
};