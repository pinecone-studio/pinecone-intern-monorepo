import { GraphQLResolveInfo } from 'graphql';
import { deleteUser } from '../../../../src/resolvers/mutations/user';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        name: 'test',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('Delete user', () => {
  it('Should delete user', async () => {
    const result = await deleteUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      name: 'test',
    });
  });

  it('Should not delete user', async () => {
    try {
      await deleteUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});
