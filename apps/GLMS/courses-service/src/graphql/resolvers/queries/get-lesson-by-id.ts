import { GraphQLError } from 'graphql';
import lessonModel from '../../../model/lesson-model';
import { QueryResolvers } from '../../generated';

export const getLessonById: QueryResolvers['getLessonById'] = async (_, { courseId }) => {
  try {
    return await lessonModel.find({ courseId });
  } catch (error: unknown) {
    throw new GraphQLError('cannot find lesson');
  }
};
