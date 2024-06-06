import { MutationResolvers } from '@/graphql/generated';
import { BadWordModel } from '@/models/bad-word.model';

export const addBadWord: MutationResolvers['addBadWord'] = async (_, { word }) => {
  try {
    const badWord = await BadWordModel.create({ word });
    return badWord._id;
  } catch (error) {
    throw new Error('Failed to add bad word');
  }
};
