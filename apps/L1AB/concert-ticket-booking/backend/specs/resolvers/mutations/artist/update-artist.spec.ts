import { updateArtist } from 'apps/L1AB/concert-ticket-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  ArtistModel: {
    findByIdAndUpdate: jest.fn().mockResolvedValueOnce({ _id: '1', artistName: 'Updated Name', status: 'Энгийн' }).mockReturnValueOnce(null),
  },
}));

describe('Update Artist', () => {
  it('should update artist successfully', async () => {
    const result = await updateArtist!({}, { input: { _id: '1', artistName: 'Updated Name', status: 'Энгийн' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '1', artistName: 'Updated Name', status: 'Энгийн' });
  });

  it('should throw an error when artist is not found or update fails', async () => {
    try {
      await updateArtist!({}, { input: { _id: '123', artistName: 'Another Name',status: 'Энгийн' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Artist with id 123 not found or failed to update'));
    }
  });
});
