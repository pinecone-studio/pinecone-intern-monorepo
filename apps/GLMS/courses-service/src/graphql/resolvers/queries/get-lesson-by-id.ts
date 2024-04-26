import { GraphQLError } from 'graphql';
import lessonModel from '../../../model/lesson-model';
import { Lesson, QueryResolvers } from '../../generated';

export const getLessonById: QueryResolvers['getLessonById'] = async (_, { id }) => {
  try {
    const lessonId = await lessonModel.findById(id).populate<Lesson>('sections');
    if (!lessonId) {
      throw new GraphQLError('cannot find lesson');
    }
    return lessonId;
  } catch (error) {
    throw new GraphQLError('cannot find lesson');
  }
};
