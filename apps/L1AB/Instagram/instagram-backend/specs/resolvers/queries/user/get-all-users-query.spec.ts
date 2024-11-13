import { GraphQLResolveInfo } from 'graphql';
import { getAllUsers } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  userModel: {
    find: jest.fn().mockResolvedValueOnce(['test']).mockReturnValueOnce([]),
  },
}));

describe('getAllUsers', () => {
  it('should get all users', async () => {
    const res = await getAllUsers!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual(['test']);
  });

  it('should throw an error', async () => {
    try {
      await getAllUsers!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('There is no user'));
    }
  });
});
