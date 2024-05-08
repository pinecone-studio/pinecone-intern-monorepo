import { Lesson, MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/lesson-model';
import { GraphQLError } from 'graphql';
export const updateLesson: MutationResolvers['updateLesson'] = async ({}, { id, title, thumbnail, position }: Lesson) => {
  try {
    const updatedLesson = await lessonModel
      .findByIdAndUpdate(
        id,
        {
          title,
          thumbnail,
          position,
        },
        { new: true }
      )
      .populate<Lesson>('sections');
    if (!updatedLesson) {
      throw new GraphQLError('An unknown error occurred');
    }
    return updatedLesson;
  } catch (error) {
    throw new GraphQLError('An unknown error occurred');
  }
};
