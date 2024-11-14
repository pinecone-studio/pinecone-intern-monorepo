import { MutationResolvers } from '../../../generated';
import { ArtistModel } from '../../../models';

export const deleteArtist: MutationResolvers['deleteArtist'] = async (_, { _id }) => {
  const result = await ArtistModel.findByIdAndDelete({ _id });
  if (!result) {
    throw new Error('Artist not deleted');
  }
  return result;
};
