import { GraphQLResolveInfo } from 'graphql';
import { getUsers } from 'src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  userModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getUsers', () => {
  it('should get users', async () => {
    const response = await getUsers!();

    expect(response).toEqual([]);
  });
});