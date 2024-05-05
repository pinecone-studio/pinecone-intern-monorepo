import { MutationResolvers } from '@/graphql/generated';
import sectionModel from '@/model/section-model';
import { GraphQLError } from 'graphql';
export const updateSection: MutationResolvers['updateSection'] = async (_, { id , title , description , contentImage}) => {

  try {
    const updatedLesson = await sectionModel
      .findByIdAndUpdate(
        id,
        {
          title,
          contentImage,
          description
        },
        { new: true }
      )
    if (!updatedLesson) {
      throw new GraphQLError('Could not find section');
    }
    return updatedLesson;
  } catch (error) {
    throw new GraphQLError('Failed to update section');
  }
};