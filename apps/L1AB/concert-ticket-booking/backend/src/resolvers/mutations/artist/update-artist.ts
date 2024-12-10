import { MutationResolvers } from '../../../generated';
import { ArtistModel } from '../../../models';

export const updateArtist: MutationResolvers['updateArtist'] = async (_, { input }) => {
  const { _id, artistName, additional, status } = input;

  const updatedArtist = await ArtistModel.findByIdAndUpdate(
    _id,
    {
      artistName,
    
      additional,
      status, 
      updatedAt: new Date(),
    },
    { new: true }
  );

  if (!updatedArtist) {
    throw new Error(`Artist with id ${_id} not found or failed to update`);
  }

  return updatedArtist;
};
