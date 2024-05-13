import { Lesson, MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/lesson-model';
import { GraphQLError } from 'graphql';

export const updateLesson: MutationResolvers['updateLesson'] = async (_, { id, sectionIds }) => {
  try {
    const updatedLesson = await lessonModel.findByIdAndUpdate(id, { sections: sectionIds }, { new: true }).populate<Lesson>('sections');
    if (!updatedLesson) {
      throw new GraphQLError('Cannot find lesson');
    }
    return updatedLesson;
  } catch (error) {
    throw new GraphQLError('An unknown error occurred');
  }
};
