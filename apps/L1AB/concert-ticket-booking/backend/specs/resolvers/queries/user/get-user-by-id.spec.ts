import { getUserById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest.fn().mockResolvedValueOnce({ _id: '01' }),
  },
}));

describe('getUserById', () => {
  it('should get user by id', async () => {
    const userId = await getUserById!({}, { _id: '01' }, { name: 'ha' }, {} as GraphQLResolveInfo);
    expect(userId).toEqual({ _id: '01' });
  });

  it('', async () => {
    try {
      await getUserById!({}, { _id: '01' }, { name: 'ha' }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('userId not found'));
    }
  });
});
