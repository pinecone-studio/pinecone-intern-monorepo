import { getAmenityById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    findById: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockRejectedValueOnce(""),
  },
}));

describe('getAmenityById', () => {
  it('should get amenity by id succesfully', async () => {
    const result = await getAmenityById!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '1' });
  });

  it('should throw an error', async () => {
    try {
      await getAmenityById!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to get amenity by id'));
    }
  });
});
