import { QueryResolvers } from '../../../generated';
import { ArtistModel } from '../../../models';

export const getArtists: QueryResolvers['getArtists'] = async () => {
  const artists = await ArtistModel.find();
  return artists;
};
