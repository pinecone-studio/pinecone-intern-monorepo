import { Lesson, MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/lesson-model';
import { GraphQLError } from 'graphql';

type ArgumentTypes = {
  id: string;
  title: string;
  thumbnail: string;
  position: number;
  sectionIds: string;
};

export const updateLesson: MutationResolvers['updateLesson'] = async (_: string, { id, title, thumbnail, position, sectionIds }: ArgumentTypes) => {
  try {
    const updatedLesson = await lessonModel
      .findByIdAndUpdate(
        id,
        {
          title,
          sections: sectionIds,
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
