import { GraphQLResolveInfo } from 'graphql';
import { createArtist } from '../../../../src/resolvers/mutations/artist/create-artist';

// Mock the ArtistModel.create method
jest.mock('../../../../src/models', () => ({
  ArtistModel: {
    create: jest.fn().mockResolvedValue({
      _id: 'artist_id',
      artistName: 'John Doe',
      image: 'http://example.com/image.jpg',
      additional: 'Some additional information',
      status: 'Энгийн',
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
        status: 'Энгийн',
      },
    };

    // Call the createArtist resolver function
    const response = await createArtist!({}, artistData, { userId: 'id' }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      _id: 'artist_id',
      artistName: 'John Doe',
      image: 'http://example.com/image.jpg',
      additional: 'Some additional information',
      status: 'Энгийн',
    });
  });
});
