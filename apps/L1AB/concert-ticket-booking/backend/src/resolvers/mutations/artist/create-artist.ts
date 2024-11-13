import { MutationResolvers } from '../../../generated';
import { ArtistModel } from '../../../models';

export const createArtist: MutationResolvers['createArtist'] = async (_, { input }) => {
  const newArtist = await ArtistModel.create({
    ...input,
  });

  return newArtist;
};
