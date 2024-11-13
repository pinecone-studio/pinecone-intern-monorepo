import { GraphQLResolveInfo } from 'graphql';
import { createArtist } from '../../../../src/resolvers/mutations/artist/create-artist';
import { ArtistModel } from '../../../../src/models';

// Mock the ArtistModel.create method
jest.mock('../../../../src/models', () => ({
  ArtistModel: {
    create: jest.fn().mockResolvedValue({
      _id: 'artist_id',
      artistName: 'John Doe',
      image: 'http://example.com/image.jpg',
      additional: 'Some additional information',
    }),
  },
}));

describe('createArtist', () => {
  it('should create an artist', async () => {
    const artistData = {
      input: {
        artistName: 'John Doe',
        image: 'http://example.com/image.jpg',
        additional: 'Some additional information',
      },
    };

    // Call the createArtist resolver function
    const response = await createArtist!({}, artistData, { userId: 'id' }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      _id: 'artist_id',
      artistName: 'John Doe',
      image: 'http://example.com/image.jpg',
      additional: 'Some additional information',
    });

    // Verify that ArtistModel.create was called correctly
    expect(ArtistModel.create).toHaveBeenCalledWith({
      artistName: 'John Doe',
      image: 'http://example.com/image.jpg',
      additional: 'Some additional information',
    });
  });
});
