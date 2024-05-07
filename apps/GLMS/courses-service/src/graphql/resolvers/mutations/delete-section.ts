import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../generated';
import sectionModel from '@/model/section-model';

export const deleteSection: MutationResolvers['deleteSection'] = async (_, { id }) => {
  try {
    const deletedSection = await sectionModel.findByIdAndDelete(id);
    if (!deletedSection) {
      throw new GraphQLError ("Cannot find section");
    }
    return deletedSection;
  } catch (error) {
    throw new GraphQLError("Delete section failed");
  }
};