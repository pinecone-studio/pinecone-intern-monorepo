import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-lesson-model';
import { GraphQLError } from 'graphql';

export const deleteLesson: MutationResolvers['deleteLesson'] = async (_, { id } ) => {
  try {
    const deletedLesson = await lessonModel.findByIdAndDelete(id);
    if (!deletedLesson) {
 return null 
    }
    return deletedLesson?.toObject();
  } catch (error) {
    throw new GraphQLError('Failed to delete course.'); 

  }
};
