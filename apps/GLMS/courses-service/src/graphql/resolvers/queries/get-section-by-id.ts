import { GraphQLError } from 'graphql';
import { QueryResolvers } from '../../generated';
import sectionModel from '@/model/section-model';

export const getSectionById: QueryResolvers['getSectionById'] = async (_, { id }) => {
  try {
    const sectionId = await sectionModel.findById(id)
    
    if (!sectionId) {
      throw new GraphQLError('cannot find section');
    }
    return sectionId;
  } catch (error) {
    throw new GraphQLError('unknown error');
  }
};
