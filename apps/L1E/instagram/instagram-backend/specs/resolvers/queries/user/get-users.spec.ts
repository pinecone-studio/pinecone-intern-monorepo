import { GraphQLResolveInfo } from 'graphql';
import { getUsers } from 'src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  userModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getCategories', () => {
  it('should get categories', async () => {
    const response = await getUsers!();

    expect(response).toEqual([]);
  });
});