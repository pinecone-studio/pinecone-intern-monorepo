import { GraphQLError } from 'graphql';
import {  QueryResolvers } from '../../generated';
import courseModel from '@/model/course-model';

export const getCourseById: QueryResolvers['getCourseById'] = async (_, { id }) => {
  try {
    const courseId = await courseModel.findById(id)
    if (!courseId) {
      throw new GraphQLError('cannot find course');
    }
    return courseId;
  } catch (error) {
    throw new GraphQLError('cannot find course');
  }
};
