import { GraphQLError } from 'graphql';
import { QueryResolvers } from '../../generated';
import lessonModel from '@/model/lesson-model';

export const getLessonInId: QueryResolvers['getLessonInId'] = async (_, { id }) => {
  try {
    const lessonId = await lessonModel.findById(id);
    if (!lessonId) {
      throw new GraphQLError('cannot find lesson');
    }
    return lessonId;
  } catch (error) {
    throw new GraphQLError('cannot find lesson');
  }
};
