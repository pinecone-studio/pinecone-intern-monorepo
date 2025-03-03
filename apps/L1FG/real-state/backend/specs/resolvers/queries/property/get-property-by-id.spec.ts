import { getPropertyByID } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  PropertyFeatureModel: {
    findById: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockResolvedValueOnce(null),
  },
}));

describe('getByPropertyId', () => {
  it('should get by id', async () => {
    const response = await getPropertyByID!({}, { _id: '1' }, { userId: '1' }, {} as GraphQLResolveInfo);
    expect(response).toEqual({ _id: '1' });
  });
  it('should not get by id', async () => {
    await expect(getPropertyByID!({}, { _id: '1' }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('Property not found');
  });
});
