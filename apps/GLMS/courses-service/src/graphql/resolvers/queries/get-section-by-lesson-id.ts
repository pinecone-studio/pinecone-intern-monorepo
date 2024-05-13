import { GraphQLError } from 'graphql';
import sectionModel from '@/model/section-model';
import { QueryResolvers } from '../../generated';

export const getSectionByLessonId: QueryResolvers['getSectionByLessonId'] = async (_, { lessonId }) => {
  try {
    return await sectionModel.find({ lessonId });
  } catch (error) {
    throw new GraphQLError('cannot find section');
  }
};
