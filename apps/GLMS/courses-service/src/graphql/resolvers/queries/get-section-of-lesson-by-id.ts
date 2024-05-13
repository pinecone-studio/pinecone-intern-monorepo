import { GraphQLError } from 'graphql';
import lessonModel from '../../../model/lesson-model';
import { QueryResolvers } from '../../generated';

export const getSectionOfLessonById: QueryResolvers['getSectionOfLessonById'] = async (_, { id }) => {
  try {
    return await lessonModel.find({ _id: id }).populate('sections');
  } catch (error) {
    throw new GraphQLError('cannot find lesson');
  }
};
