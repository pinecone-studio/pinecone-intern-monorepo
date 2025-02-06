import { getProperties } from 'apps/L1FG/real-state/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  PropertyFeatureModel: {
    find: jest.fn().mockReturnValueOnce([]),
  },
}));

describe('getProperty', () => {
  it('should get properties', async () => {
    const response = await getProperties!({}, {}, { userId: '1' }, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
});
