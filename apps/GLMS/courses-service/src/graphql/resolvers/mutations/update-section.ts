import { MutationResolvers } from '@/graphql/generated';
import sectionModel from '@/model/section-model';
import { GraphQLError } from 'graphql';

export const updateSection: MutationResolvers['updateSection'] = async (_, { id , sectionInput}) => {
  try {
    const updatedSection = await sectionModel
      .findByIdAndUpdate( id, sectionInput )
    if (!updatedSection) {
      throw new GraphQLError('Could not find section');
    }
    return updatedSection;
  } catch (error) {
    throw new GraphQLError('Failed to update section');
  }
};