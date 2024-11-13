import { getAmenityById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    findById: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockResolvedValueOnce(null),
  },
}));

describe('getAmenityById', () => {
  it('should return an amenity when found', async () => {
    const res = await getAmenityById!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(res).toEqual({ _id: '1' });
  });

  it('should return error', async () => {
    try {
      await getAmenityById!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Error fetching an amenity'));
    }
  });
});
