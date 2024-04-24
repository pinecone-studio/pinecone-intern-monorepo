import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/lesson-model';
import { GraphQLError } from 'graphql';
export const updateLesson: MutationResolvers['updateLesson'] = async (_, { id,title, thumbnail ,position, sectionIds}) => {

  try {
    const updatedLesson = await lessonModel
      .findByIdAndUpdate(
        id,
        {
          title,
          sections: sectionIds,
          thumbnail,
          position
        },
        { new: true }
      )
      .populate('sections');
    if (!updatedLesson) {
      throw new GraphQLError('An unknown error occurred');
    }
    return updatedLesson;
  } catch (error) {
    throw new GraphQLError('An unknown error occurred');
  }
};
